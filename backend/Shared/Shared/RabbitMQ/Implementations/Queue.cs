using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Implementations
{
    public class Queue : IQueue
    {
        private readonly ExchangeOptions _exchangeOptions;
        private readonly QueueOptions _queueOptions;

        private readonly IConnection _connection;
        private readonly IModel _channel;
        private readonly EventingBasicConsumer _consumer;

        private bool _consuming;
        private readonly System.Collections.Generic.Queue<TaskCompletionSource<RabbitMQMessage>> _listenersQueue = new();

        public Queue(ExchangeOptions exchangeOptions, QueueOptions queueOptions, IRabbitMQConnectionFactory connectionFactory)
        {
            _exchangeOptions = exchangeOptions;
            _queueOptions = queueOptions;

            _connection = connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();

            DeclareExchange();
            DeclareAndBindQueue();

            _consumer = new EventingBasicConsumer(_channel);
            _consumer.Received += ConsumerOnReceived;
        }

        public Task<RabbitMQMessage> ListenAsync(CancellationToken cancellationToken)
        {
            TaskCompletionSource<RabbitMQMessage> tcs = new();

            cancellationToken.Register(() => tcs.TrySetCanceled());

            _listenersQueue.Enqueue(tcs);

            StartConsuming();

            return tcs.Task;
        }

        public Task<RabbitMQMessage> ListenAsync()
        {
            TaskCompletionSource<RabbitMQMessage> tcs = new();

            _listenersQueue.Enqueue(tcs);

            StartConsuming();

            return tcs.Task;
        }

        private void ConsumerOnReceived(object? sender, BasicDeliverEventArgs deliveryArgs)
        {
            TaskCompletionSource<RabbitMQMessage>? tcs;

            if(!_listenersQueue.TryDequeue(out tcs))
            {
                StopConsuming();
                _channel.BasicNack(deliveryArgs.DeliveryTag, false, true);
                return;
            }

            _channel.BasicAck(deliveryArgs.DeliveryTag, false);

            if (!_listenersQueue.Any())
            {
                StopConsuming();
            }

            var message = new RabbitMQMessage(deliveryArgs, _exchangeOptions, _queueOptions);

            tcs.TrySetResult(message);
        }

        public void SendMessage(ReadOnlyMemory<byte> encodedData)
        {
            _channel.BasicPublish(_exchangeOptions.Name, _queueOptions.RoutingKey, null, encodedData);
        }

        private void DeclareExchange()
        {
            _channel.ExchangeDeclare(_exchangeOptions.Name, _exchangeOptions.Type);
        }

        private void DeclareAndBindQueue()
        {
            _channel.QueueDeclare(_queueOptions.Name, durable: true, exclusive: false, autoDelete: false);
            _channel.QueueBind(_queueOptions.Name, _exchangeOptions.Name, _queueOptions.RoutingKey);
        }

        private void StartConsuming()
        {
            if (_consuming)
            {
                return;
            }

            _consuming = true;
            _channel.BasicConsume(_queueOptions.Name, false, _consumer);
        }

        private void StopConsuming()
        {
            if (!_consuming)
            {
                return;
            }

            _consuming = false;
            _channel.BasicCancel(_consumer.ConsumerTags.First());
        }

        public void Dispose()
        {
            _connection.Dispose();
            _channel.Dispose();
        }
    }
}

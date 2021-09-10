using System;
using System.Collections.Generic;
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
    public class VoidQueue : QueueBase, IVoidQueue
    {
        private readonly RabbitMQConsumer _consumer;

        private readonly Queue<TaskCompletionSource<RabbitMQMessage>> _listenersQueue = new();

        public VoidQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions, IRabbitMQConnectionFactory connectionFactory)
            : base(exchangeOptions, queueOptions, connectionFactory)
        {
            _consumer = new RabbitMQConsumer(QueueOptions.Name, channel);
            _consumer.Received += ConsumerOnReceived;
        }

        public Task<RabbitMQMessage> ListenAsync(CancellationToken? cancellationToken = null)
        {
            TaskCompletionSource<RabbitMQMessage> tcs = new();

            cancellationToken?.Register(() => tcs.TrySetCanceled());

            _listenersQueue.Enqueue(tcs);

            _consumer.StartConsuming();

            return tcs.Task;
        }

        private void ConsumerOnReceived(object? sender, BasicDeliverEventArgs deliveryArgs)
        {
            TaskCompletionSource<RabbitMQMessage>? tcs;

            if(!_listenersQueue.TryDequeue(out tcs))
            {
                _consumer.StopConsuming();
                channel.BasicNack(deliveryArgs.DeliveryTag, false, true);
                return;
            }

            channel.BasicAck(deliveryArgs.DeliveryTag, false);

            if (!_listenersQueue.Any())
            {
                _consumer.StopConsuming();
            }

            var message = new RabbitMQMessage(deliveryArgs, ExchangeOptions, QueueOptions);

            tcs.TrySetResult(message);
        }

        public void SendMessage(ReadOnlyMemory<byte> encodedData)
        {
            channel.BasicPublish(ExchangeOptions.Name, QueueOptions.RoutingKey, null, encodedData);
        }
    }
}

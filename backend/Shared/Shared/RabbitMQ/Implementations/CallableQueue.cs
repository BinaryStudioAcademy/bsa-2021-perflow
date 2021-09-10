using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Implementations
{
    public class CallableQueue : QueueBase, ICallableQueue
    {
        private string _responseQueueName = default!;

        private QueueCallHandler? _callHandler;

        private readonly ConcurrentDictionary<string, TaskCompletionSource<RabbitMQResponse>> _responses = new();

        private RabbitMQConsumer? _responseConsumer;
        private RabbitMQConsumer? _requestConsumer;

        public CallableQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions, IRabbitMQConnectionFactory connectionFactory)
            : base(exchangeOptions, queueOptions, connectionFactory) { }

        public void RegisterCallHandler(QueueCallHandler callHandler)
        {
            if (_requestConsumer == null)
            {
                _requestConsumer = new RabbitMQConsumer(QueueOptions.Name, channel);
                _requestConsumer.Received += OnRequestReceived;
            }

            _callHandler = callHandler;
            _requestConsumer.StartConsuming();
        }

        public Task<RabbitMQResponse> Call(ReadOnlyMemory<byte> encodedData)
        {
            if (_responseConsumer == null)
            {
                _responseQueueName = channel.QueueDeclare().QueueName;
                channel.QueueBind(_responseQueueName, ExchangeOptions.Name, _responseQueueName);

                _responseConsumer = new RabbitMQConsumer(_responseQueueName, channel);
                _responseConsumer.Received += OnResponseReceived;
            }

            var callId = Guid.NewGuid().ToString();

            var properties = channel.CreateBasicProperties();
            properties.CorrelationId = callId;
            properties.ReplyTo = _responseQueueName;

            var tcs = new TaskCompletionSource<RabbitMQResponse>();

            _responses[callId] = tcs;

            _responseConsumer.StartConsuming(true);

            channel.BasicPublish(ExchangeOptions.Name, QueueOptions.RoutingKey, properties, encodedData);

            return tcs.Task;
        }

        private async void OnRequestReceived(object? sender, BasicDeliverEventArgs deliveryArgs)
        {
            _requestConsumer!.StopConsuming();

            if (_callHandler == null)
            {
                channel.BasicNack(deliveryArgs.DeliveryTag, false, true);
                return;
            }

            var properties = channel.CreateBasicProperties();
            properties.CorrelationId = deliveryArgs.BasicProperties.CorrelationId;

            RabbitMQResponse? response = null;

            try
            {
                var request = new RabbitMQMessage(deliveryArgs, ExchangeOptions, QueueOptions);

                response = await _callHandler.Invoke(request);
            }
            catch (Exception e)
            {
                response = new RabbitMQResponse
                {
                    StatusCode = RabbitMQResponseStatus.Fail,
                    Body = new BinaryData(e.ToString())
                };
            }
            finally
            {
                var responseBytes = response!.ToBytes();

                channel.BasicPublish(
                    ExchangeOptions.Name,
                    deliveryArgs.BasicProperties.ReplyTo,
                    properties,
                    responseBytes
                );
                channel.BasicAck(deliveryArgs.DeliveryTag, false);

                _requestConsumer.StartConsuming();
            }
        }

        private void OnResponseReceived(object? sender, BasicDeliverEventArgs deliveryArgs)
        {
            var callId = deliveryArgs.BasicProperties.CorrelationId;

            if (callId == null || !_responses.ContainsKey(callId))
            {
                return;
            }

            if (_responses.TryRemove(callId, out var responseTcs))
            {
                var response = RabbitMQResponse.FromBytes(deliveryArgs.Body.ToArray());

                responseTcs.TrySetResult(response);
            }
        }
    }
}

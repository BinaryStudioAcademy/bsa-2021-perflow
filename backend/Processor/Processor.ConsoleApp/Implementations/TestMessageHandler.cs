using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Interfaces;
using Shared.RabbitMQ.Extensions;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using Shared.RabbitMQ.Options;

namespace Processor.ConsoleApp.Implementations
{
    public class TestMessageHandler : IAsyncMessageHandler, IDisposable
    {
        private readonly ILogger<TestMessageHandler> _logger;

        private readonly ExchangeOptions _exchangeOptions;
        private readonly QueueOptions _queueOptions;
        private readonly IQueue _queue;

        private const string StartMessage =
            "Started listening to a queue:\n" +
            "\tExchange name: {Exchange}\n" +
            "\tQueue name: {Queue}\n" +
            "\tRouting key: {Key}";

        public TestMessageHandler(
            IOptions<ExchangeOptions> exchangeOptions,
            IOptions<QueueOptions> queueOptions,
            IQueueFactory queueFactory,
            ILogger<TestMessageHandler> logger)
        {
            _logger = logger;

            _exchangeOptions = exchangeOptions.Value;
            _queueOptions = queueOptions.Value;

            _queue = queueFactory.CreateQueue(_exchangeOptions, _queueOptions);
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation(StartMessage, _exchangeOptions.Name, _queueOptions.Name, _queueOptions.RoutingKey);

            do
            {
                var message = await _queue.ListenAsync(cancellationToken);

                _logger.LogInformation("{Date} Received message", DateTime.Now.ToLongTimeString());

                // Simulate processing delay
                await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken);

                HandleMessage(message);

            } while (!cancellationToken.IsCancellationRequested);
        }

        private void HandleMessage(RabbitMQMessage message)
        {
            var messageText = message.ReadString();

            _logger.LogInformation("{Date} Processed message: {Message}", DateTime.Now.ToLongTimeString(), messageText);
        }

        public void Dispose()
        {
            _queue.Dispose();
        }
    }
}

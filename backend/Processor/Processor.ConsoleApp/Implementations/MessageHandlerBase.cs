using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;

namespace Processor.ConsoleApp.Implementations
{
    public abstract class MessageHandlerBase : IAsyncMessageHandler, IDisposable
    {
        private readonly CancellationTokenSource _cancellationTokenSource = new();

        protected ILogger<MessageHandlerBase> Logger { get; }

        protected abstract IQueue Queue { get; }

        protected MessageHandlerBase(ILogger<MessageHandlerBase> logger)
        {
            Logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            cancellationToken.Register(() => _cancellationTokenSource.Cancel());

            var handlerCancellationToken = _cancellationTokenSource.Token;

            await Initialize();

            while (!handlerCancellationToken.IsCancellationRequested)
            {
                var message = await Queue.ListenAsync(handlerCancellationToken);

                try
                {
                    await HandleMessage(message);
                }
                catch (Exception exception)
                {
                    Logger.LogError("{Date} Couldn't process message\n\tError: {Error}", DateTime.Now.ToLongTimeString(), exception.ToString());
                }
            }
        }

        protected abstract Task Initialize();

        protected abstract Task HandleMessage(RabbitMQMessage message);

        protected void Stop()
        {
            _cancellationTokenSource.Cancel();
        }

        public void Dispose()
        {
            Queue.Dispose();
            _cancellationTokenSource.Dispose();
        }
    }
}

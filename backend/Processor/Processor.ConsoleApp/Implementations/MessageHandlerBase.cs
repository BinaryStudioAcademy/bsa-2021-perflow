using System;
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
        protected ILogger<MessageHandlerBase> Logger { get; }

        protected abstract IQueue Queue { get; }

        protected MessageHandlerBase(ILogger<MessageHandlerBase> logger)
        {
            Logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Initialize();

            do
            {
                var message = await Queue.ListenAsync(cancellationToken);

                try
                {
                    await HandleMessage(message);
                }
                catch (Exception exception)
                {
                    Logger.LogError("{Date} Couldn't process message\n\tError: {Error}", DateTime.Now.ToLongTimeString(), exception.ToString());
                }


            } while (!cancellationToken.IsCancellationRequested);
        }

        protected abstract Task Initialize();

        protected abstract Task HandleMessage(RabbitMQMessage message);

        public void Dispose()
        {
            Queue.Dispose();
        }
    }
}

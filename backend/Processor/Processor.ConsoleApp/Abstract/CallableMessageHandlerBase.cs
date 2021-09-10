using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;

namespace Processor.ConsoleApp.Abstract
{
    public abstract class CallableMessageHandlerBase : IAsyncMessageHandler, IDisposable
    {
        protected ILogger<CallableMessageHandlerBase> Logger { get; }

        protected abstract ICallableQueue CallableQueue { get; }

        protected CallableMessageHandlerBase(ILogger<CallableMessageHandlerBase> logger)
        {
            Logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Initialize();

            CallableQueue.RegisterCallHandler(HandleCallSafely);
        }

        private async Task<RabbitMQResponse> HandleCallSafely(RabbitMQMessage message)
        {
            try
            {
                return await HandleCall(message);
            }
            catch (Exception e)
            {
                Logger.LogError("{Date} Couldn't process call\n\tError: {Error}", DateTime.Now.ToLongTimeString(), e.ToString());
                return new RabbitMQResponse
                {
                    StatusCode = RabbitMQResponseStatus.Fail,
                    Body = new BinaryData(Encoding.UTF8.GetBytes(e.ToString()))
                };
            }
        }

        protected abstract Task Initialize();

        protected abstract Task<RabbitMQResponse> HandleCall(RabbitMQMessage message);

        public void Dispose()
        {
            CallableQueue.Dispose();
        }
    }
}

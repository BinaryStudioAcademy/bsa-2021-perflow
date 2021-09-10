using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IQueueFactory
    {
        public IVoidQueue CreateVoidQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions);

        public ICallableQueue CreateCallableQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions);
    }
}

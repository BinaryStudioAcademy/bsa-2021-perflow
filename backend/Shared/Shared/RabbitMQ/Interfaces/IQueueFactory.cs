using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IQueueFactory
    {
        public IQueue CreateQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions);
    }
}

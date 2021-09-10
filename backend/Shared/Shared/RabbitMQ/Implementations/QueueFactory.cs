using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Implementations
{
    public class QueueFactory : IQueueFactory
    {
        private readonly IRabbitMQConnectionFactory _connectionFactory;

        public QueueFactory(IRabbitMQConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public IVoidQueue CreateVoidQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions)
        {
            return new VoidQueue(exchangeOptions, queueOptions, _connectionFactory);
        }

        public ICallableQueue CreateCallableQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions)
        {
            return new CallableQueue(exchangeOptions, queueOptions, _connectionFactory);
        }
    }
}

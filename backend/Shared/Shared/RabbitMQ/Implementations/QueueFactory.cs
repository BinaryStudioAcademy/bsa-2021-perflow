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

        public IQueue CreateQueue(ExchangeOptions exchangeOptions, QueueOptions queueOptions)
        {
            return new Queue(exchangeOptions, queueOptions, _connectionFactory);
        }
    }
}

using RabbitMQ.Client;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Implementations
{
    public abstract class QueueBase : IRabbitMQQueue
    {
        protected readonly IConnection connection;
        protected readonly IModel channel;

        public ExchangeOptions ExchangeOptions { get; }
        public QueueOptions QueueOptions { get; }

        protected QueueBase(ExchangeOptions exchangeOptions, QueueOptions queueOptions, IRabbitMQConnectionFactory connectionFactory)
        {
            ExchangeOptions = exchangeOptions;
            QueueOptions = queueOptions;

            connection = connectionFactory.CreateConnection();
            channel = connection.CreateModel();

            DeclareExchange();
            DeclareAndBindQueue();
        }

        protected void DeclareExchange()
        {
            channel.ExchangeDeclare(ExchangeOptions.Name, ExchangeOptions.Type);
        }

        protected void DeclareAndBindQueue()
        {
            channel.QueueDeclare(QueueOptions.Name, durable: true, exclusive: false, autoDelete: false);
            channel.QueueBind(QueueOptions.Name, ExchangeOptions.Name, QueueOptions.RoutingKey);
        }

        public void Dispose()
        {
            connection.Dispose();
            channel.Dispose();
        }
    }
}

using RabbitMQ.Client;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IRabbitMQConnectionFactory
    {
        public IConnection CreateConnection();
    }
}

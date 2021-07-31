using RabbitMQ.Client;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Implementations
{
    public class RabbitMQConnectionFactory : IRabbitMQConnectionFactory
    {
        private readonly IConnectionFactory _factory;

        public RabbitMQConnectionFactory(RabbitMQOptions options)
        {
            _factory = new ConnectionFactory
            {
                HostName = options.HostName,
                Port = options.Port,
                UserName = options.UserName,
                Password = options.Password
            };
        }

        public IConnection CreateConnection()
        {
            return _factory.CreateConnection();
        }
    }
}

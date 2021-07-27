using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Shared.RabbitMQ
{
    class RabbitMQWrapper : IDisposable
    {
        IConnection _connection;
        IModel _channel;

        public RabbitMQWrapper()
        {
            var _factory = new ConnectionFactory() { HostName = "localhost" };
            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void DeclareExhange(string exhangeName, string exhangeType)
        {
            _channel.ExchangeDeclare(exhangeName, exhangeType ?? string.Empty);
        }

        public void BindQueue(string exhangeName, string routingKey, string queueName)
        {
            _channel.QueueDeclare(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);
            _channel.QueueBind(queueName, exhangeName, routingKey);
        }

        public void SetAcknowledge(ulong deliveryTag, bool processed)
        {
            if (processed)
                _channel.BasicAck(deliveryTag, false);
            else
                _channel.BasicNack(deliveryTag, false, true);
        }

        public void ListenQueue(string queueName, EventHandler<BasicDeliverEventArgs> response)
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += response;

            _channel.BasicConsume(queue: queueName,
                                  autoAck: false,
                                  consumer: consumer);
        }

        public void SendMessageToQueue(string exhangeName, string routingKey, string queueName, string message)
        {
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(exhangeName,
                                  routingKey,
                                  basicProperties: null,
                                  body);
        }

        public void Dispose()
        {
            _connection?.Dispose();
            _channel?.Dispose();
        }
    }
}

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

        public RabbitMQWrapper(IConnectionFactory connectionFactory)
        {
            _connection = connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void DeclareExсhange(string exсhangeName, string exсhangeType)
        {
            _channel.ExchangeDeclare(exсhangeName, exсhangeType ?? string.Empty);
        }

        public void BindQueue(string exсhangeName, string routingKey, string queueName)
        {
            _channel.QueueDeclare(
                queue: queueName,
                durable: true,
                exclusive: false,
                autoDelete: false);
            _channel.QueueBind(queueName, exсhangeName, routingKey);
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

        public void SendMessageToQueue(string exchangeName, string routingKey, string message)
        {
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(exchangeName,
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

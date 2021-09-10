using System;
using System.Linq;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace Shared.RabbitMQ.Implementations
{
    public class RabbitMQConsumer
    {
        private bool _consuming;
        private readonly EventingBasicConsumer _innerConsumer;
        private readonly IModel _channel;
        private readonly string _queueName;

        public event EventHandler<BasicDeliverEventArgs>? Received;

        public bool Consuming => _consuming;

        public RabbitMQConsumer(string queueName, IModel channel)
        {
            _queueName = queueName;
            _channel = channel;
            _innerConsumer = new EventingBasicConsumer(_channel);
            _innerConsumer.Received += OnReceived;
        }

        private void OnReceived(object? sender, BasicDeliverEventArgs deliverEventArgs)
        {
            Received?.Invoke(sender, deliverEventArgs);
        }

        public void StartConsuming(bool autoAck = false)
        {
            if (_consuming)
            {
                return;
            }

            _consuming = true;
            _channel.BasicConsume(_queueName, autoAck, _innerConsumer);
        }

        public void StopConsuming()
        {
            if (!_consuming)
            {
                return;
            }

            _consuming = false;
            _channel.BasicCancel(_innerConsumer.ConsumerTags.First());
        }
    }
}

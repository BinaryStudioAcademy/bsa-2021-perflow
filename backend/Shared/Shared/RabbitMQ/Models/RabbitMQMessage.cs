using RabbitMQ.Client.Events;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Models
{
    public class RabbitMQMessage
    {
        public ulong DeliveryTag { get; }

        public string ConsumerTag { get; }

        public byte[] Body { get; }

        public bool IsRedelivered { get; }

        public ExchangeOptions ExchangeOptions { get; }

        public QueueOptions QueueOptions { get; }

        public RabbitMQMessage(BasicDeliverEventArgs args, ExchangeOptions exchangeOptions, QueueOptions queueOptions)
        {
            ExchangeOptions = exchangeOptions;
            QueueOptions = queueOptions;

            DeliveryTag = args.DeliveryTag;
            ConsumerTag = args.ConsumerTag;
            Body = args.Body.ToArray();
            IsRedelivered = args.Redelivered;
        }
    }
}

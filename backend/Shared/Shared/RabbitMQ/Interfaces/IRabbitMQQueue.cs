using System;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IRabbitMQQueue : IDisposable
    {
        public ExchangeOptions ExchangeOptions { get; }

        public QueueOptions QueueOptions { get; }
    }
}

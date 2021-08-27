using System;
using System.Threading;
using System.Threading.Tasks;
using Shared.RabbitMQ.Models;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IQueue : IDisposable
    {
        public ExchangeOptions ExchangeOptions { get; }

        public QueueOptions QueueOptions { get; }

        public Task<RabbitMQMessage> ListenAsync();

        public Task<RabbitMQMessage> ListenAsync(CancellationToken cancellationToken);

        public void SendMessage(ReadOnlyMemory<byte> encodedData);
    }
}

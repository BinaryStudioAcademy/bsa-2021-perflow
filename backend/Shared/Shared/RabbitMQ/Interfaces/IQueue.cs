using System;
using System.Threading;
using System.Threading.Tasks;
using Shared.RabbitMQ.Models;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IQueue : IDisposable
    {
        public Task<RabbitMQMessage> ListenAsync();

        public Task<RabbitMQMessage> ListenAsync(CancellationToken cancellationToken);

        public void SendMessage(ReadOnlyMemory<byte> encodedData);
    }
}

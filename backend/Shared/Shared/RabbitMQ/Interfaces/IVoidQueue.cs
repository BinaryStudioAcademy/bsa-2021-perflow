using System;
using System.Threading;
using System.Threading.Tasks;
using Shared.RabbitMQ.Models;

namespace Shared.RabbitMQ.Interfaces
{
    public interface IVoidQueue : IRabbitMQQueue
    {
        public Task<RabbitMQMessage> ListenAsync(CancellationToken? cancellationToken = null);

        public void SendMessage(ReadOnlyMemory<byte> encodedData);
    }
}

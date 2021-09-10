using System;
using System.Threading.Tasks;
using Shared.RabbitMQ.Models;

namespace Shared.RabbitMQ.Interfaces
{
    public delegate Task<RabbitMQResponse> QueueCallHandler(RabbitMQMessage message);

    public interface ICallableQueue : IRabbitMQQueue
    {
        public void RegisterCallHandler(QueueCallHandler callHandler);

        public Task<RabbitMQResponse> Call(ReadOnlyMemory<byte> encodedData);
    }
}

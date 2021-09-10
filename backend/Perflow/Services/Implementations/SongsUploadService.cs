using System;
using Microsoft.Extensions.Options;
using Perflow.Services.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;

namespace Perflow.Services.Implementations
{
    public class SongsUploadService : ISongsUploadService, IDisposable
    {
        private readonly IVoidQueue _songProcessingQueue;

        public SongsUploadService(IOptions<SongProcessingRabbitMQOptions> options, IQueueFactory queueFactory)
        {
            var rabbitMqOptions = options.Value;

            _songProcessingQueue = queueFactory.CreateVoidQueue(rabbitMqOptions.ExchangeOptions, rabbitMqOptions.QueueOptions);
        }

        public void UploadSong(SongProcessingOptions options)
        {
            _songProcessingQueue.SendMessage(options.ToBytes());
        }

        public void Dispose()
        {
            _songProcessingQueue?.Dispose();
        }
    }
}

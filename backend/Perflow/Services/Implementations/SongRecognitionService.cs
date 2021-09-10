using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Perflow.Services.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;

namespace Perflow.Services.Implementations
{
    public class SongRecognitionService : ISongRecognitionService, IDisposable
    {
        private readonly ICallableQueue _songRecognitionQueue;

        public SongRecognitionService(IOptions<SongRecognitionRabbitMQOptions> options, IQueueFactory queueFactory)
        {
            var rabbitMqOptions = options.Value;

            _songRecognitionQueue = queueFactory.CreateCallableQueue(rabbitMqOptions.ExchangeOptions, rabbitMqOptions.QueueOptions);
        }

        public async Task<SongRecognitionResult> RecognizeAsync(SongRecognitionOptions options)
        {
            var rabbitMqResponse = await _songRecognitionQueue.Call(options.ToBytes());

            if (rabbitMqResponse.StatusCode == RabbitMQResponseStatus.Fail)
            {
                return new SongRecognitionResult
                {
                    Success = false
                };
            }

            return SongRecognitionResult.FromBytes(rabbitMqResponse.Body.ToArray());
        }

        public void Dispose()
        {
            _songRecognitionQueue?.Dispose();
        }
    }
}

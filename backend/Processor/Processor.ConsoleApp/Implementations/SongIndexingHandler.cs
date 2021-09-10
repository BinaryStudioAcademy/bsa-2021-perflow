using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Abstract;
using Processor.ConsoleApp.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;

namespace Processor.ConsoleApp.Implementations
{
    public class SongIndexingHandler : VoidMessageHandlerBase
    {
        private readonly IBlobService _blobService;
        private readonly ISongsProcessingService _songsProcessingService;

        public SongIndexingHandler(
            IQueueFactory queueFactory,
            IOptions<SongIndexingRabbitMQOptions> rabbitMqOptions,
            ILogger<SongIndexingHandler> logger,
            IBlobService blobService,
            ISongsProcessingService songsProcessingService) : base(logger)
        {
            _blobService = blobService;
            _songsProcessingService = songsProcessingService;

            var options = rabbitMqOptions.Value;

            var exchangeOptions = options.ExchangeOptions;
            var queueOptions = options.QueueOptions;

            VoidQueue = queueFactory.CreateVoidQueue(exchangeOptions, queueOptions);
        }

        protected override IVoidQueue VoidQueue { get; }

        protected override Task Initialize()
        {
            const string initializationMessage =
@"{Data} Started SongIndexingHandler
  Exchange name: {ExchangeName}
  Exchange type: {ExchangeType}
  VoidQueue name: {QueueName}
  Routing key: {RoutingKey}";

            Logger.LogInformation(
                initializationMessage,
                DateTime.Now.ToLongTimeString(),
                VoidQueue.ExchangeOptions.Name,
                VoidQueue.ExchangeOptions.Type,
                VoidQueue.QueueOptions.Name,
                VoidQueue.QueueOptions.RoutingKey
            );

            return Task.CompletedTask;
        }

        protected override async Task HandleMessage(RabbitMQMessage message)
        {
            Logger.LogInformation("{Date} Started indexing songs", DateTime.Now.ToLongTimeString());

            var processingOptions = SongIndexingOptions.FromBytes(message.Body);

            foreach (var indexData in processingOptions.SongsIndexData)
            {
                await IndexSong(indexData);
            }
        }

        private async Task IndexSong(SongIndexData data)
        {
            Logger.LogInformation(
                "{Date} Indexing song\n\tId: {Id}\n\tBlobId: {BlobId}",
                DateTime.Now.ToLongTimeString(),
                data.Id,
                data.BlobId
            );

            var songBlobDto = await _blobService.DownloadFileBlobAsync("songs", data.BlobId);

            var tempGuid = Guid.NewGuid().ToString();
            var sourceFile = Path.Combine(_songsProcessingService.TempPath, tempGuid);

            await File.WriteAllBytesAsync(sourceFile, songBlobDto.Content.ToArray());

            try
            {
                await _songsProcessingService.ProcessSongFingerprint(sourceFile, data.Id);

                Logger.LogInformation(
                    "{Date} Successfully indexed song\n\tId: {Id}\n\tBlobId: {BlobId}",
                    DateTime.Now.ToLongTimeString(),
                    data.Id,
                    data.BlobId
                );
            }
            finally
            {
                File.Delete(sourceFile);
            }
        }
    }
}

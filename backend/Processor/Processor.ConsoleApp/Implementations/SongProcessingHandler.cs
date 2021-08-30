using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Interfaces;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using Xabe.FFmpeg;
using Xabe.FFmpeg.Downloader;

namespace Processor.ConsoleApp.Implementations
{
    public class SongProcessingHandler : MessageHandlerBase
    {
        private readonly IBlobService _blobService;

        private readonly ISongsProcessingService _songsProcessingService;

        private readonly string _containerName;

        protected override IQueue Queue { get; }

        public SongProcessingHandler(
            IOptions<SongProcessingRabbitMQOptions> rabbitMqOptions,
            IOptions<BlobStorageOptions> blobStorageOptions,
            IQueueFactory queueFactory,
            ILogger<SongProcessingHandler> logger,
            IBlobService blobService, ISongsProcessingService songsProcessingService) : base(logger)
        {
            _blobService = blobService;

            _songsProcessingService = songsProcessingService;

            _containerName = blobStorageOptions.Value.SongsContainer;

            var options = rabbitMqOptions.Value;

            var exchangeOptions = options.ExchangeOptions;
            var queueOptions = options.QueueOptions;

            Queue = queueFactory.CreateQueue(exchangeOptions, queueOptions);
        }

        protected override async Task Initialize()
        {
            Logger.LogInformation("{Date} Starting SongProcessingHandler...", DateTime.Now.ToLongTimeString());

            await DownloadFFmpegAsync();

            await SetFFmpegPermissionsAsync();

            const string initializationMessage =
@"{Data} Started SongProcessingHandler
  Exchange name: {ExchangeName}
  Exchange type: {ExchangeType}
  Queue name: {QueueName}
  Routing key: {RoutingKey}";

            Logger.LogInformation(
                initializationMessage,
                DateTime.Now.ToLongTimeString(),
                Queue.ExchangeOptions.Name,
                Queue.ExchangeOptions.Type,
                Queue.QueueOptions.Name,
                Queue.QueueOptions.RoutingKey
            );
        }

        private async Task DownloadFFmpegAsync()
        {
            Logger.LogInformation("{Date} Updating FFmpeg...", DateTime.Now.ToLongTimeString());

            var lastProgressReport = DateTime.Now;
            var progress = new Progress<ProgressInfo>(info =>
            {
                if ((DateTime.Now - lastProgressReport).Seconds < 3)
                {
                    return;
                }

                lastProgressReport = DateTime.Now;

                Logger.LogInformation(
                    "{Date} FFmpeg updating progress: {Progress}",
                    DateTime.Now.ToLongTimeString(),
                    $"{info.DownloadedBytes.ToString()} / {info.TotalBytes.ToString()} bytes"
                );
            });

            await FFmpegDownloader.GetLatestVersion(FFmpegVersion.Official, progress);
        }

        private async Task SetFFmpegPermissionsAsync()
        {
            if (!RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                return;
            }

            Logger.LogInformation("{Date} Setting FFmpeg permissions...", DateTime.Now.ToLongTimeString());

            var permissionsSet = await RunBashCommand("chmod +x ffmpeg ffprobe");

            if (!permissionsSet)
            {
                Logger.LogError("{Date} Couldn't set FFmpeg permissions, quiting SongProcessingHandler", DateTime.Now.ToLongTimeString());
                Stop();
            }
        }

        private async Task<bool> RunBashCommand(string arguments)
        {
            try
            {
                using var process = Process.Start("/bin/bash", arguments);
                await process.WaitForExitAsync();
                return process.ExitCode == 0;
            }
            catch (Exception exception)
            {
                Logger.LogError("Couldn't run command. Error: {Message}", exception.ToString());

                return false;
            }
        }

        protected override async Task HandleMessage(RabbitMQMessage message)
        {
            Logger.LogInformation("{Date} Started processing songs", DateTime.Now.ToLongTimeString());

            var processingOptions = SongProcessingOptions.FromBytes(message.Body);

            await _songsProcessingService.ProcessSongs(processingOptions);

            Logger.LogInformation(
                "{Date} Processed song:\n\tSource:{SourceId}\n\tVeryHigh: {Id1}\n\tHigh: {Id2}\n\tMedium: {Id3}\n\tLow: {Id4}",
                DateTime.Now.ToLongTimeString(),
                _blobService.GetFileUrl(_containerName, processingOptions.SourceBlobId),
                _blobService.GetFileUrl(_containerName, processingOptions.QualityLevels.VeryHigh.id),
                _blobService.GetFileUrl(_containerName, processingOptions.QualityLevels.High.id),
                _blobService.GetFileUrl(_containerName, processingOptions.QualityLevels.Medium.id),
                _blobService.GetFileUrl(_containerName, processingOptions.QualityLevels.Low.id)
            );
        }
    }
}

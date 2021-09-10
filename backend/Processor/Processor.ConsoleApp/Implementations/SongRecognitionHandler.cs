using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Abstract;
using Processor.ConsoleApp.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using Shared.SongRecognition.Services;
using SoundFingerprinting;
using SoundFingerprinting.Audio;
using SoundFingerprinting.Builder;

namespace Processor.ConsoleApp.Implementations
{
    public class SongRecognitionHandler : CallableMessageHandlerBase
    {
        private readonly IAudioService _audioService;
        private readonly IModelServiceFactory _modelServiceFactory;
        private readonly ISongsProcessingService _songsProcessingService;

        protected override ICallableQueue CallableQueue { get; }

        public SongRecognitionHandler(
            ILogger<SongRecognitionHandler> logger,
            IQueueFactory queueFactory,
            IOptions<SongRecognitionRabbitMQOptions> rabbitMqOptions,
            IAudioService audioService,
            ISongsProcessingService songsProcessingService,
            IModelServiceFactory modelServiceFactory) : base(logger)
        {
            _audioService = audioService;
            _songsProcessingService = songsProcessingService;
            _modelServiceFactory = modelServiceFactory;

            var options = rabbitMqOptions.Value;

            var exchangeOptions = options.ExchangeOptions;
            var queueOptions = options.QueueOptions;

            CallableQueue = queueFactory.CreateCallableQueue(exchangeOptions, queueOptions);
        }

        protected override Task Initialize()
        {
            Logger.LogInformation("{Date} Starting SongRecognitionHandler...", DateTime.Now.ToLongTimeString());

            using var emyService = _modelServiceFactory.CreateModelService();
            var infos = emyService.Info;

            foreach (ModelServiceInfo info in infos)
            {
                Logger.LogInformation(
                    "{Date} Connected to Emy storage | Id = {Id} | Tracks count = {Count}",
                    DateTime.Now.ToLongTimeString(),
                    info.Id,
                    info.TracksCount
                );
            }

            const string initializationMessage =
@"{Data} Started SongProcessingHandler
  Exchange name: {ExchangeName}
  Exchange type: {ExchangeType}
  VoidQueue name: {QueueName}
  Routing key: {RoutingKey}";

            Logger.LogInformation(
                initializationMessage,
                DateTime.Now.ToLongTimeString(),
                CallableQueue.ExchangeOptions.Name,
                CallableQueue.ExchangeOptions.Type,
                CallableQueue.QueueOptions.Name,
                CallableQueue.QueueOptions.RoutingKey
            );

            return Task.CompletedTask;
        }

        protected override async Task<RabbitMQResponse> HandleCall(RabbitMQMessage message)
        {
            Logger.LogInformation("{Date} Processing Song Recognition request...", DateTime.Now.ToLongTimeString());

            var sourceId = Guid.NewGuid().ToString();
            var tempId = Guid.NewGuid().ToString();

            var sourceFile = Path.Combine(_songsProcessingService.TempPath, sourceId);
            var tempFile = Path.Combine(_songsProcessingService.TempPath, $"{tempId}.wav");

            try
            {
                using var emyService = _modelServiceFactory.CreateModelService();

                var options = SongRecognitionOptions.FromBytes(message.Body);

                await File.WriteAllBytesAsync(sourceFile, options.Data.ToArray());

                await _songsProcessingService.PrepareSongForRecognition(sourceFile, tempFile);

                var queryResult = await QueryCommandBuilder.Instance
                    .BuildQueryCommand()
                    .From(tempFile)
                    .UsingServices(emyService, _audioService)
                    .Query();

                emyService.RegisterMatches(queryResult.ResultEntries);

                var match = queryResult.BestMatch;

                Logger.LogInformation(
                    "{Date} Processed Song Recognition request\n\tFound matches: {Matches}\n\tSong Id: {Id}",
                    DateTime.Now.ToLongTimeString(),
                    match != null,
                    int.Parse(match?.Track.Id ?? "-1"));

                var result = new SongRecognitionResult
                {
                    Success = match != null,
                    Confidence = match?.Confidence ?? 0,
                    SongId = int.Parse(match?.Track.Id ?? "-1")
                };

                return new RabbitMQResponse
                {
                    StatusCode = RabbitMQResponseStatus.Success,
                    Body = new BinaryData(result.ToBytes())
                };
            }
            finally
            {
                File.Delete(sourceFile);
                File.Delete(tempFile);
            }
        }
    }
}

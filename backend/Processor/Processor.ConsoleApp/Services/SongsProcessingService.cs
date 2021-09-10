using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Interfaces;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.Processor.Models;
using Shared.SongRecognition.Services;
using SoundFingerprinting.Audio;
using SoundFingerprinting.Builder;
using SoundFingerprinting.Data;
using Xabe.FFmpeg;

namespace Processor.ConsoleApp.Services
{
    public class SongsProcessingService : ISongsProcessingService
    {
        private readonly ILogger<SongsProcessingService> _logger;
        private readonly IBlobService _blobService;
        private readonly IAudioService _audioService;
        private readonly IModelServiceFactory _modelServiceFactory;

        private readonly string _containerName;

        public string TempPath { get; }

        public SongsProcessingService(
            IBlobService blobService,
            IOptions<BlobStorageOptions> blobStorageOptions,
            IAudioService audioService,
            ILogger<SongsProcessingService> logger,
            IModelServiceFactory modelServiceFactory)
        {
            _blobService = blobService;
            _audioService = audioService;
            _logger = logger;
            _modelServiceFactory = modelServiceFactory;

            _containerName = blobStorageOptions.Value.SongsContainer;

            var rootPath = Path.GetFullPath(".");
            TempPath = Path.Combine(rootPath, "temp");

            if (!Directory.Exists(TempPath))
            {
                Directory.CreateDirectory(TempPath);
            }
        }

        public async Task ProcessSongs(SongProcessingOptions options)
        {
            var sourceFile = Path.Combine(TempPath, $"{options.SourceBlobId}");

            try
            {
                await File.WriteAllBytesAsync(sourceFile, options.SongData.ToArray());

                await UploadSong(sourceFile, options.SourceBlobId, options.SourceContentType);

                var processingTasks = options.QualityLevels
                    .Select(qualityLevel => ProcessSong(sourceFile, qualityLevel))
                    .Append(ProcessSongFingerprint(sourceFile, options.Id));

                await Task.WhenAll(processingTasks);
            }
            finally
            {
                File.Delete(sourceFile);
            }
        }

        public async Task PrepareSongForRecognition(string sourcePath, string preparedSongPath)
        {
            var mediaInfo = await Xabe.FFmpeg.FFmpeg.GetMediaInfo(sourcePath);

            var audioStream = mediaInfo.AudioStreams.First();

            await Xabe.FFmpeg.FFmpeg.Conversions.New()
                .AddStream(audioStream)
                .AddParameter("-af afftdn")
                .SetOutput(preparedSongPath)
                .Start();
        }

        private async Task ProcessSongFingerprint(string sourcePath, int id)
        {
            var tempGuid = Guid.NewGuid().ToString();
            var tempFile = Path.Combine(TempPath, $"{tempGuid}.wav");

            try
            {
                using var emyService = _modelServiceFactory.CreateModelService();
                await PrepareSongForRecognition(sourcePath, tempFile);

                var track = new TrackInfo(id.ToString(), $"song-{id}", "");

                var hashedFingerprint = await FingerprintCommandBuilder.Instance
                    .BuildFingerprintCommand()
                    .From(tempFile)
                    .UsingServices(_audioService)
                    .Hash();

                emyService.Insert(track, hashedFingerprint);

                _logger.LogInformation("Hashed song #{Id}\n\t{Hash}", id.ToString(), hashedFingerprint.ToString());
            }
            finally
            {
                await Task.Delay(500);
                File.Delete(tempFile);
            }
        }

        private async Task ProcessSong(string sourcePath, QualityLevel qualityLevel)
        {
            var outputFile = Path.Combine(TempPath, $"{qualityLevel.id}.mp3");

            try
            {
                var mediaInfo = await Xabe.FFmpeg.FFmpeg.GetMediaInfo(sourcePath);

                var audioStream = mediaInfo.AudioStreams.First()
                    .SetCodec(AudioCodec.mp3)
                    .SetBitrate(qualityLevel.bitrate);

                await Xabe.FFmpeg.FFmpeg.Conversions.New()
                    .AddStream(audioStream)
                    .SetOutput(outputFile)
                    .Start();

                await UploadSong(outputFile, qualityLevel.id, "audio/mp3");
            }
            finally
            {
                File.Delete(outputFile);
            }
        }

        private async Task UploadSong(string sourcePath, string guid, string contentType)
        {
            var blob = new BlobDto
            {
                Guid = guid,
                ContentType = contentType,
                Content = BinaryData.FromBytes(await File.ReadAllBytesAsync(sourcePath))
            };

            await _blobService.UploadFileBlobAsync(_containerName, blob);
        }
    }
}

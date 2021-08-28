using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Interfaces;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.Processor.Models;
using Xabe.FFmpeg;

namespace Processor.ConsoleApp.Implementations
{
    public class SongsProcessingService : ISongsProcessingService
    {
        private readonly IBlobService _blobService;

        private readonly string _tempPath;
        private readonly string _containerName;

        public SongsProcessingService(
            IBlobService blobService,
            IOptions<BlobStorageOptions> blobStorageOptions)
        {
            _blobService = blobService;

            _containerName = blobStorageOptions.Value.SongsContainer;

            var rootPath = Path.GetFullPath(".");
            _tempPath = Path.Combine(rootPath, "temp");

            if (!Directory.Exists(_tempPath))
            {
                Directory.CreateDirectory(_tempPath);
            }
        }

        public async Task ProcessSongs(SongProcessingOptions options)
        {
            var sourceFile = Path.Combine(_tempPath, $"{options.SourceBlobId}");
            await File.WriteAllBytesAsync(sourceFile, options.SongData.ToArray());

            await UploadSong(sourceFile, options.SourceBlobId, options.SourceContentType);

            var processingTasks = options.QualityLevels
                .Select(qualityLevel => ProcessSong(sourceFile, qualityLevel));

            await Task.WhenAll(processingTasks);

            File.Delete(sourceFile);
        }

        private async Task ProcessSong(string sourcePath, QualityLevel qualityLevel)
        {
            var mediaInfo = await FFmpeg.GetMediaInfo(sourcePath);

            var audioStream = mediaInfo.AudioStreams.First()
                .SetCodec(AudioCodec.mp3)
                .SetBitrate(qualityLevel.bitrate);

            var outputFile = Path.Combine(_tempPath, $"{qualityLevel.id}.mp3");

            await FFmpeg.Conversions.New()
                .AddStream(audioStream)
                .SetOutput(outputFile)
                .Start();

            await UploadSong(outputFile, qualityLevel.id, "audio/mp3");

            File.Delete(outputFile);
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

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
            var tempGuid = Guid.NewGuid().ToString();
            var tempFile = Path.Combine(_tempPath, $"{tempGuid}");
            await File.WriteAllBytesAsync(tempFile, options.SongData.ToArray());

            var processingTasks = options.QualityLevels
                .Select(qualityLevel => ProcessAndUploadSong(tempFile, qualityLevel));

            await Task.WhenAll(processingTasks);

            File.Delete(tempFile);
        }

        private async Task ProcessAndUploadSong(string sourcePath, QualityLevel qualityLevel)
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

            await UploadSong(outputFile, qualityLevel.id);
        }

        private async Task UploadSong(string sourcePath, string guid)
        {
            var blob = new BlobDto
            {
                Guid = guid,
                ContentType = "audio/mp3",
                Content = BinaryData.FromBytes(await File.ReadAllBytesAsync(sourcePath))
            };

            File.Delete(sourcePath);

            await _blobService.UploadFileBlobAsync(_containerName, blob);
        }
    }
}

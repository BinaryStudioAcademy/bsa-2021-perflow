using System;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Interfaces;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using SkiaSharp;

namespace Processor.ConsoleApp.Implementations
{
    public class ImageProcessingHandler : IAsyncMessageHandler, IDisposable
    {
        private readonly ILogger<ImageProcessingHandler> _logger;
        private readonly IBlobService _blobService;

        private readonly IQueue _queue;

        private readonly string _blobContainer;

        public ImageProcessingHandler(
            IOptions<ImageProcessingRabbitMQOptions> rabbitMqOptions,
            IOptions<BlobStorageOptions> blobStorageOptions,
            IQueueFactory queueFactory,
            ILogger<ImageProcessingHandler> logger,
            IBlobService blobService)
        {
            _logger = logger;

            _blobContainer = blobStorageOptions.Value.ImagesContainer;
            _blobService = blobService;

            var options = rabbitMqOptions.Value;

            var exchangeOptions = options.ExchangeOptions;
            var queueOptions = options.QueueOptions;

            _queue = queueFactory.CreateQueue(exchangeOptions, queueOptions);
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("{Data} Started ImageProcessingHandler", DateTime.Now.ToLongTimeString());

            do
            {
                var message = await _queue.ListenAsync(cancellationToken);

                HandleMessage(message);
            } while (!cancellationToken.IsCancellationRequested);
        }

        private void HandleMessage(RabbitMQMessage message)
        {
            var processingOptions = ImageProcessingOptions.FromBytes(message.Body);

            var processedData = ProcessImage(processingOptions);

            UploadProcessedImage(processingOptions.BlobId, processedData);

            _logger.LogInformation(
                "{Date} Processed image:\n\tBlobId: {Id}\n\tQuality: {Quality},\n\tUrl: {Url}",
                DateTime.Now.ToLongTimeString(),
                processingOptions.BlobId,
                processingOptions.Quality.ToString(),
                _blobService.GetFileUrl(_blobContainer, processingOptions.BlobId)
            );
        }

        private SKData ProcessImage(ImageProcessingOptions options)
        {
            using var original = SKBitmap.Decode(options.ImageData);

            var size = new Size(original.Width, original.Height);

            if (!options.TargetSize.IsEmpty)
            {
                size = options.TargetSize;
            }
            else if(!options.MaxSize.IsEmpty)
            {
                size = GetConstrainedSize(size, options.MaxSize);
            }

            using var scaledBitmap = original.Resize(new SKImageInfo(size.Width, size.Height), SKFilterQuality.Medium);
            using var scaledImage = SKImage.FromBitmap(scaledBitmap);

            return scaledBitmap.Encode(SKEncodedImageFormat.Jpeg, options.Quality);
        }

        private void UploadProcessedImage(string guid, SKData data)
        {
            var blob = new BlobDto
            {
                Guid = guid,
                ContentType = "image/jpeg",
                Content = BinaryData.FromBytes(data.ToArray())
            };

            _blobService.UploadFileBlobAsync(_blobContainer, blob);
        }

        private Size GetConstrainedSize(Size original, Size constraints)
        {
            double widthRatio = (double)original.Width / constraints.Width;
            double heightRatio = (double)original.Height / constraints.Height;

            if (widthRatio > 1 || heightRatio > 1)
            {
                var maxRation = Math.Max(widthRatio, heightRatio);
                return new Size(
                    (int)Math.Floor(original.Width / maxRation),
                    (int)Math.Floor(original.Height / maxRation)
                );
            }

            return original;
        }

        public void Dispose()
        {
            _queue.Dispose();
        }
    }
}

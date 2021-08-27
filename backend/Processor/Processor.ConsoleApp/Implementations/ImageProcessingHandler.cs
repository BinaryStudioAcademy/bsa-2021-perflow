using System;
using System.Drawing;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.Processor.Models;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Models;
using SkiaSharp;

namespace Processor.ConsoleApp.Implementations
{
    public class ImageProcessingHandler : MessageHandlerBase
    {
        private readonly IBlobService _blobService;

        private readonly string _blobContainer;

        protected override IQueue Queue { get; }

        public ImageProcessingHandler(
            IOptions<ImageProcessingRabbitMQOptions> rabbitMqOptions,
            IOptions<BlobStorageOptions> blobStorageOptions,
            IQueueFactory queueFactory,
            ILogger<ImageProcessingHandler> logger,
            IBlobService blobService) : base(logger)
        {
            _blobContainer = blobStorageOptions.Value.ImagesContainer;
            _blobService = blobService;

            var options = rabbitMqOptions.Value;

            var exchangeOptions = options.ExchangeOptions;
            var queueOptions = options.QueueOptions;

            Queue = queueFactory.CreateQueue(exchangeOptions, queueOptions);
        }

        protected override Task Initialize()
        {
            const string initializationMessage =
@"
{Data} Started ImageProcessingHandler
  Exchange name: {ExchangeName}
  Exchange type: {ExchangeType}
  Queue name: {QueueName}
  Routing key: {RoutingKey}
";

            Logger.LogInformation(
                initializationMessage,
                DateTime.Now.ToLongTimeString(),
                Queue.ExchangeOptions.Name,
                Queue.ExchangeOptions.Type,
                Queue.QueueOptions.Name,
                Queue.QueueOptions.RoutingKey
            );

            return Task.CompletedTask;
        }

        protected override Task HandleMessage(RabbitMQMessage message)
        {
            Logger.LogInformation("{Date} Received ImageProcessingRequest", DateTime.Now.ToLongTimeString());

            var processingOptions = ImageProcessingOptions.FromBytes(message.Body);

            var processedData = ProcessImage(processingOptions);

            UploadProcessedImage(processingOptions.BlobId, processedData);

            Logger.LogInformation(
                "{Date} Processed image:\n\tBlobId: {Id}\n\tQuality: {Quality},\n\tUrl: {Url}",
                DateTime.Now.ToLongTimeString(),
                processingOptions.BlobId,
                processingOptions.Quality.ToString(),
                _blobService.GetFileUrl(_blobContainer, processingOptions.BlobId)
            );

            return Task.CompletedTask;
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
    }
}

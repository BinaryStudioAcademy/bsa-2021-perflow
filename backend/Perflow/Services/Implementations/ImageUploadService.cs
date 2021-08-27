using System;
using System.Drawing;
using Microsoft.Extensions.Options;
using Perflow.Services.Interfaces;
using Shared.Processor.Models;
using Shared.RabbitMQ.Extensions;
using Shared.RabbitMQ.Interfaces;

namespace Perflow.Services.Implementations
{
    public class ImageUploadService : IImageUploadService, IDisposable
    {
        private readonly IQueue _imageProcessingQueue;

        public ImageUploadService(IOptions<ImageProcessingRabbitMQOptions> options, IQueueFactory queueFactory)
        {
            var rabbitMqOptions = options.Value;

            _imageProcessingQueue = queueFactory.CreateQueue(rabbitMqOptions.ExchangeOptions, rabbitMqOptions.QueueOptions);
        }

        public void UploadImage(string guid, BinaryData imageData)
        {
            var options = new ImageProcessingOptions
            {
                BlobId = guid,
                Quality = 90,
                MaxSize = new Size(1920, 1080),
                ImageData = imageData
            };

            _imageProcessingQueue.SendMessage(options.ToBytes());
        }

        public void Dispose()
        {
            _imageProcessingQueue?.Dispose();
        }
    }
}

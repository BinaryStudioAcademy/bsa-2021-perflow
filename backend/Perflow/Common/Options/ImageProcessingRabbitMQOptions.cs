using Shared.RabbitMQ.Options;

namespace Perflow.Common.Options
{
    public class ImageProcessingRabbitMQOptions
    {
        public const string Key = "ImageProcessingOptions";

        public ExchangeOptions ExchangeOptions { get; set; } = default!;

        public QueueOptions QueueOptions { get; set; } = default!;
    }
}

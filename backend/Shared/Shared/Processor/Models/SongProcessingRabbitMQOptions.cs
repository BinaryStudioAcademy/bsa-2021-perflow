using Shared.RabbitMQ.Options;

namespace Shared.Processor.Models
{
    public class SongProcessingRabbitMQOptions
    {
        public const string Key = "SongProcessingOptions";

        public ExchangeOptions ExchangeOptions { get; set; } = default!;

        public QueueOptions QueueOptions { get; set; } = default!;
    }
}

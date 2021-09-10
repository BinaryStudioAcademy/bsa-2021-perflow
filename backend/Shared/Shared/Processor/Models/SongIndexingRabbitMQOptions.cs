using Shared.RabbitMQ.Options;

namespace Shared.Processor.Models
{
    public class SongIndexingRabbitMQOptions
    {
        public const string Key = "SongIndexingOptions";

        public ExchangeOptions ExchangeOptions { get; set; } = default!;

        public QueueOptions QueueOptions { get; set; } = default!;
    }
}

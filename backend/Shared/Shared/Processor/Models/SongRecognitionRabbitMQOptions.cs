using Shared.RabbitMQ.Options;

namespace Shared.Processor.Models
{
    public class SongRecognitionRabbitMQOptions
    {
        public const string Key = "SongRecognitionOptions";

        public ExchangeOptions ExchangeOptions { get; set; } = default!;

        public QueueOptions QueueOptions { get; set; } = default!;
    }
}

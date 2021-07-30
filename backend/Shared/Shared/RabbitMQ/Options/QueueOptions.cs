#nullable disable

namespace Shared.RabbitMQ.Options
{
    public class QueueOptions
    {
        public string Name { get; set; }

        public string RoutingKey { get; set; }
    }
}

#nullable disable

namespace Shared.RabbitMQ.Options
{
    public class RabbitMQOptions
    {
        public string HostName { get; set; }

        public int Port { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}

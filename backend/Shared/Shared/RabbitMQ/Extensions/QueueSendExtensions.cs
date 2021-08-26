using System.Text;
using Shared.RabbitMQ.Interfaces;

namespace Shared.RabbitMQ.Extensions
{
    public static class QueueSendExtensions
    {
        public static void SendString(this IQueue queue, string message)
        {
            queue.SendMessage(Encoding.UTF8.GetBytes(message));
        }

        public static void SendString(this IQueue queue, string message, Encoding encoding)
        {
            queue.SendMessage(encoding.GetBytes(message));
        }
    }
}

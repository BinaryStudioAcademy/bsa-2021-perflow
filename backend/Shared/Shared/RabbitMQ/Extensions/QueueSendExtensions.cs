using System.Text;
using Shared.RabbitMQ.Interfaces;

namespace Shared.RabbitMQ.Extensions
{
    public static class QueueSendExtensions
    {
        public static void SendString(this IVoidQueue voidQueue, string message)
        {
            voidQueue.SendMessage(Encoding.UTF8.GetBytes(message));
        }

        public static void SendString(this IVoidQueue voidQueue, string message, Encoding encoding)
        {
            voidQueue.SendMessage(encoding.GetBytes(message));
        }
    }
}

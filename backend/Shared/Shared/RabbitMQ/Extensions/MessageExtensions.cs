using System.Text;
using Shared.RabbitMQ.Models;

namespace Shared.RabbitMQ.Extensions
{
    public static class MessageExtensions
    {
        public static string ReadString(this RabbitMQMessage message)
        {
            return Encoding.UTF8.GetString(message.Body);
        }

        public static string ReadString(this RabbitMQMessage message, Encoding encoding)
        {
            return encoding.GetString(message.Body);
        }
    }
}

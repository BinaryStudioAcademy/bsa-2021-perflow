using System.Text;
using Shared.RabbitMQ.Models;

namespace Shared.RabbitMQ.Extensions
{
    public static class ResponseExtensions
    {
        public static string ReadErrorMessage(this RabbitMQResponse response)
        {
            return Encoding.UTF8.GetString(response.Body);
        }
    }
}

using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;
using Shared.Processor.Models;
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

        public static void SendImageProcessingRequest(this IQueue queue, ImageProcessingOptions options, BinaryData imageData)
        {
            byte[] optionsBytes = options.ToBytes();
            byte[] imageBytes = imageData.ToArray();

            var messageBytes = new byte[optionsBytes.Length + imageBytes.Length];
            Buffer.BlockCopy(optionsBytes, 0, messageBytes, 0, optionsBytes.Length);
            Buffer.BlockCopy(imageBytes, 0, messageBytes, optionsBytes.Length, imageBytes.Length);

            queue.SendMessage(options.ToBytes());
        }
    }
}

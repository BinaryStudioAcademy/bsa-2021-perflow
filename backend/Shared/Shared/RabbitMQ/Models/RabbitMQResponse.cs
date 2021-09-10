using System;
using System.IO;

namespace Shared.RabbitMQ.Models
{
    public class RabbitMQResponse
    {
        public RabbitMQResponseStatus StatusCode { get; init; }
        public BinaryData Body { get; set; } = new BinaryData(string.Empty);

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            writer.Write((byte)StatusCode);

            var bodyBytes = Body.ToArray();

            writer.Write7BitEncodedInt(bodyBytes.Length);
            writer.Write(bodyBytes);

            return memoryStream.ToArray();
        }

        public static RabbitMQResponse FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var response = new RabbitMQResponse
            {
                StatusCode = (RabbitMQResponseStatus)reader.ReadByte()
            };

            var songBytesSize = reader.Read7BitEncodedInt();
            response.Body = BinaryData.FromBytes(reader.ReadBytes(songBytesSize));

            return response;
        }
    }
}

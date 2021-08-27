using System;
using System.Drawing;
using System.IO;

namespace Shared.Processor.Models
{
    public class ImageProcessingOptions
    {
        public string BlobId { get; init; } = string.Empty;

        public int Quality { get; init; } = 100;

        /// <summary>
        /// If not Size.empty, processor will resize image ignoring aspect ratio
        /// </summary>
        public Size TargetSize { get; init; } = Size.Empty;

        public Size MaxSize { get; init; } = Size.Empty;

        public BinaryData ImageData { get; set; } = default!;

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            writer.Write(BlobId);
            writer.Write(Quality);
            writer.Write(TargetSize.Width);
            writer.Write(TargetSize.Height);
            writer.Write(MaxSize.Width);
            writer.Write(MaxSize.Height);

            var imageBytes = ImageData.ToArray();

            writer.Write7BitEncodedInt(imageBytes.Length);
            writer.Write(imageBytes);

            return memoryStream.ToArray();
        }

        public static ImageProcessingOptions FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var options = new ImageProcessingOptions
            {
                BlobId = reader.ReadString(),
                Quality = reader.ReadInt32(),
                TargetSize = new Size(reader.ReadInt32(), reader.ReadInt32()),
                MaxSize = new Size(reader.ReadInt32(), reader.ReadInt32())
            };

            var imageBytesSize = reader.Read7BitEncodedInt();
            options.ImageData = BinaryData.FromBytes(reader.ReadBytes(imageBytesSize));

            return options;
        }
    }
}

using System;
using System.IO;

namespace Shared.Processor.Models
{
    public class SongProcessingOptions
    {
        public SongsQualityLevels QualityLevels { get; init; } = default!;

        public BinaryData SongData { get; set; } = default!;

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            WriteQualityLevel(writer, QualityLevels.VeryHigh);
            WriteQualityLevel(writer, QualityLevels.High);
            WriteQualityLevel(writer, QualityLevels.Medium);
            WriteQualityLevel(writer, QualityLevels.Low);

            var imageBytes = SongData.ToArray();

            writer.Write7BitEncodedInt(imageBytes.Length);
            writer.Write(imageBytes);

            return memoryStream.ToArray();
        }

        private static void WriteQualityLevel(BinaryWriter writer, QualityLevel level)
        {
            writer.Write(level.id);
            writer.Write(level.bitrate);
        }

        public static SongProcessingOptions FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var options = new SongProcessingOptions
            {
                QualityLevels = new SongsQualityLevels()
                {
                    VeryHigh = ReadQualityLevel(reader),
                    High = ReadQualityLevel(reader),
                    Medium = ReadQualityLevel(reader),
                    Low = ReadQualityLevel(reader)
                }
            };

            var songBytesSize = reader.Read7BitEncodedInt();
            options.SongData = BinaryData.FromBytes(reader.ReadBytes(songBytesSize));

            return options;
        }

        private static QualityLevel ReadQualityLevel(BinaryReader reader)
        {
            return new QualityLevel(
                reader.ReadString(),
                reader.ReadInt64()
            );
        }
    }
}

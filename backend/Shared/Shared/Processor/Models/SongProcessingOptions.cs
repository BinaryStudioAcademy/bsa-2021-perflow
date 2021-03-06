using System;
using System.IO;

namespace Shared.Processor.Models
{
    public class SongProcessingOptions
    {
        public int Id { get; init; }

        public string SourceBlobId { get; init; } = string.Empty;

        public string SourceContentType { get; init; } = string.Empty;

        public SongsQualityLevels QualityLevels { get; init; } = default!;

        public BinaryData SongData { get; set; } = default!;

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            writer.Write(Id);

            writer.Write(SourceBlobId);
            writer.Write(SourceContentType);

            WriteQualityLevel(writer, QualityLevels.VeryHigh);
            WriteQualityLevel(writer, QualityLevels.High);
            WriteQualityLevel(writer, QualityLevels.Medium);
            WriteQualityLevel(writer, QualityLevels.Low);

            var songBytes = SongData.ToArray();

            writer.Write7BitEncodedInt(songBytes.Length);
            writer.Write(songBytes);

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
                Id = reader.ReadInt32(),
                SourceBlobId = reader.ReadString(),
                SourceContentType = reader.ReadString(),
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

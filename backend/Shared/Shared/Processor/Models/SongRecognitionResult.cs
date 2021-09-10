using System.IO;

namespace Shared.Processor.Models
{
    public class SongRecognitionResult
    {
        public bool Success { get; set; }

        public double Confidence { get; set; }

        public int SongId { get; set; }

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            writer.Write(Success);
            writer.Write(Confidence);
            writer.Write(SongId);

            return memoryStream.ToArray();
        }

        public static SongRecognitionResult FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var result = new SongRecognitionResult
            {
                Success = reader.ReadBoolean(),
                Confidence = reader.ReadDouble(),
                SongId = reader.ReadInt32()
            };

            return result;
        }
    }
}

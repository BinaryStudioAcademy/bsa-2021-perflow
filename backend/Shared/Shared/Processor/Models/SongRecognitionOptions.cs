using System;
using System.IO;

namespace Shared.Processor.Models
{
    public class SongRecognitionOptions
    {
        public BinaryData Data { get; set; } = default!;

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            var songBytes = Data.ToArray();

            writer.Write7BitEncodedInt(songBytes.Length);
            writer.Write(songBytes);

            return memoryStream.ToArray();
        }

        public static SongRecognitionOptions FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var options = new SongRecognitionOptions();

            var songBytesSize = reader.Read7BitEncodedInt();
            options.Data = BinaryData.FromBytes(reader.ReadBytes(songBytesSize));

            return options;
        }
    }
}

using System.Collections.Generic;
using System.IO;

namespace Shared.Processor.Models
{
    public class SongIndexData
    {
        public int Id { get; set; }
        public string BlobId { get; set; } = string.Empty;
    }

    public class SongIndexingOptions
    {
        public List<SongIndexData> SongsIndexData { get; set; } = new();

        public byte[] ToBytes()
        {
            using var memoryStream = new MemoryStream();
            using var writer = new BinaryWriter(memoryStream);

            writer.Write7BitEncodedInt(SongsIndexData.Count);

            foreach (var indexData in SongsIndexData)
            {
                writer.Write(indexData.Id);
                writer.Write(indexData.BlobId);
            }

            return memoryStream.ToArray();
        }

        public static SongIndexingOptions FromBytes(byte[] bytes)
        {
            using var memoryStream = new MemoryStream(bytes);
            using var reader = new BinaryReader(memoryStream);

            var options = new SongIndexingOptions();

            var dataCount = reader.Read7BitEncodedInt();

            for (int i = 0; i < dataCount; ++i)
            {
                options.SongsIndexData.Add(new SongIndexData()
                {
                    Id = reader.ReadInt32(),
                    BlobId = reader.ReadString()
                });
            }

            return options;
        }
    }
}

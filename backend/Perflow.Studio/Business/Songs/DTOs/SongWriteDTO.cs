using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public class SongWriteDTO
    {
        public string Name { get; init; } = string.Empty;

        public AuthorType AuthorType { get; init; }

        public int ArtistId { get; init; }

        public int? GroupId { get; init; }

        public int AlbumId { get; init; }

        public int Duration { get; init; }

        public bool HasCensorship { get; init; }

        public int Order { get; set; }
    }
}

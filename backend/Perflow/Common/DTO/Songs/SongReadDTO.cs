using System;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;
using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Songs
{
    public class SongReadDTO {
        public int Id { get; set; }
        public string Name { get; set; }
        public AuthorType AuthorType { get; set; }
        public int? ArtistId { get; set; }
        public ArtistReadDTO Artist { get; set; }
        public int? GroupId { get; set; }
        public GroupReadDTO Group { get; set; }
        public int? AlbumId { get; set; }
        public AlbumReadDTO Album { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
        public string BlobId { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public bool IsLiked { get; set; }
    }
}

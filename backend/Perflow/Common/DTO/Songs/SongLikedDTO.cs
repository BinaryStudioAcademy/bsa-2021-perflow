using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;
using System;

namespace Perflow.Common.DTO.Songs
{
    public class SongLikedDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
        public GroupNameDTO Group { get; set; }
        public ArtistNameDTO Artist { get; set; }
        public AlbumNameDTO Album { get; set; }
        public bool IsLiked { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}

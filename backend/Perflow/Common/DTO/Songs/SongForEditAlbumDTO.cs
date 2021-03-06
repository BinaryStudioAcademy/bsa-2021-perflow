using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Tags;
using Perflow.Common.DTO.Users;
using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Songs
{
    public class SongForEditAlbumDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ArtistForAlbumDTO Artist { get; set; }
        public GroupForAlbumDTO Group { get; set; }
        public AlbumForPlaylistDTO Album { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public bool IsLiked { get; set; }
        public IEnumerable<TagReadDTO> Tags { get; set; }
    }
}

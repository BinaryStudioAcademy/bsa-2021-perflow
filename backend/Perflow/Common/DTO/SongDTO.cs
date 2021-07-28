using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO
{
    public sealed class SongDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int ArtistId { get; set; }

        public UserDTO Artist { get; set; }

        public string IconURL { get; set; }

        public int Duration { get; set; }

        public DateTime CreatedAt { get; set; }

        public bool HasCensorship { get; set; }

        public ICollection<AlbumDTO> Album { get; set; }

        public ICollection<PlaylistDTO> Playlists { get; set; }

        public ICollection<SongReactionDTO> Reactions { get; set; }
    }
}

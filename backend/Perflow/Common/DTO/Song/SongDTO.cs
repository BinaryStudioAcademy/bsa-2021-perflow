using Perflow.Domain;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;
using Perflow.Common.DTO.User;
using Perflow.Common.DTO.Artist;
using Perflow.Common.DTO.Album;

namespace Perflow.Common.DTO.Song
{
    public sealed class SongDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public AuthorType AuthorType { get; set; }
        public int? ArtistId { get; set; }

        public UserDTO Artist { get; set; }
        public int? GroupId { get; set; }
        public GroupDTO Group { get; set; }

        public string IconURL { get; set; }

        public int Duration { get; set; }

        public bool HasCensorship { get; set; }

        public ICollection<AlbumDTO> Albums { get; set; }

        public ICollection<PlaylistSong> Playlists { get; set; }

        public ICollection<SongReactionDTO> Reactions { get; set; }
    }
}

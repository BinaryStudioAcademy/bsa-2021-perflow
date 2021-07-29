using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Song : AuditEntity
    {
        public string Name { get; set; }

        public AuthorType AuthorType { get; set; }
        public int? ArtistId { get; set; }

        public User Artist { get; set; }
        public int? GroupId { get; set; }
        public Group Group { get; set; }

        public string IconURL { get; set; }

        public int Duration { get; set; }

        public bool HasCensorship { get; set; }

        public ICollection<Album> Albums { get; set; }

        public ICollection<PlaylistSong> Playlists { get; set; }

        public ICollection<SongReaction> Reactions { get; set; }
    }
}

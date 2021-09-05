using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Song : AuditEntity, IEquatable<Song>
    {
        public string Name { get; set; }

        public AuthorType AuthorType { get; set; }

        public int? ArtistId { get; set; }
        public User Artist { get; set; }

        public int? GroupId { get; set; }
        public Group Group { get; set; }

        public int? AlbumId { get; set; }
        public Album Album { get; set; }
        public int Duration { get; set; }

        public bool HasCensorship { get; set; }

        public string SourceBlobId { get; set; }
        public string VeryHighBlobId { get; set; }
        public string HighBlobId { get; set; }
        public string MediumBlobId { get; set; }
        public string LowBlobId { get; set; }

        public int Order { get; set; }

        public ICollection<PlaylistSong> Playlists { get; set; }

        public ICollection<SongReaction> Reactions { get; set; }

        public bool Equals(Song other)
        {
            if (other is null) return false;

            return Id == other.Id;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}

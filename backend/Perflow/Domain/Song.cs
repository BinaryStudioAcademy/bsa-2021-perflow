using Perflow.Domain.Abstract;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Song : BaseEntity
    {
        public string Name { get; set; }

        public int ArtistId { get; set; }

        public User Artist { get; set; }

        public string IconURL { get; set; }

        public int Duration { get; set; }

        public bool HasCensorship { get; set; }

        public ICollection<Album> Album { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

        public ICollection<SongReaction> Reactions { get; set; }
    }
}

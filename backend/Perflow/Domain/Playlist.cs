using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Playlist : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string IconURL { get; set; }

        public int AuthorId { get; set; }

        public User Author { get; set; }

        public bool IsGlobal { get; set; }

        public AccessType AccessType { get; set; }

        public ICollection<Song> Songs { get; set; } 

        public ICollection<PlaylistReaction> Reactions { get; set; }
    }
}

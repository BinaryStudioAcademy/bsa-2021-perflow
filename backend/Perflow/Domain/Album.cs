using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Album : BaseEntity
    {
        public string Name { get; set; }
        public int ReleaseYear { get; set; }
        public string IconURL { get; set; }
        public string Description { get; set; }
        public AlbumRegion Region { get; set; }
        public bool isPublished { get; set; }
        public AuthorType AuthorType { get; set; }
        public int? AuthorId { get; set; }
        public User Author { get; set; }
        public int? GroupId { get; set; }
        public Group Group { get; set; }
        public bool isSingle { get; set; }
        public ICollection<AlbumReaction> Reactions { get; set; }
        public ICollection<Song> Songs { get; set; }
    }
}

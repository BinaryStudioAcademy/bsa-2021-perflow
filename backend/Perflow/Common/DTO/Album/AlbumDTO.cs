using Perflow.Common.DTO.Artist;
using Perflow.Common.DTO.Song;
using Perflow.Common.DTO.User;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Album
{
    public sealed class AlbumDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public int? ReleaseYear { get; set; }
        public string IconURL { get; set; }
        public string Description { get; set; }
        public AlbumRegion Region { get; set; }
        public bool isPublished { get; set; }
        public AuthorType AuthorType { get; set; }
        public int? AuthorId { get; set; }
        public UserDTO Author { get; set; }
        public int? GroupId { get; set; }
        public GroupDTO Group { get; set; }
        public bool isSingle { get; set; }
        public ICollection<AlbumReactionDTO> Reactions { get; set; }
        public ICollection<SongDTO> Songs { get; set; }
    }
}

using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public class SongReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        
        public AuthorType AuthorType { get; set; }
        
        public int? ArtistId { get; set; }
        
        public int? GroupId { get; set; }
        
        public int? AlbumId { get; set; }
        
        public int Duration { get; set; }
        
        public bool HasCensorship { get; set; }

        public int Order { get; set; }
        
        public DateTimeOffset CreatedAt { get; set; }
    }
}

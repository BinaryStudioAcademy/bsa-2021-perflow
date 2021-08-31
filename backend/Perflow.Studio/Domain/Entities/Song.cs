using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Domain.Entities
{
    public class Song : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public AuthorType AuthorType { get; set; }

        public int? ArtistId { get; set; }


        public int? GroupId { get; set; }

        public int? AlbumId { get; set; }
        public int Duration { get; set; }

        public bool HasCensorship { get; set; }

        public string SourceBlobId { get; set; } = string.Empty;
        public string VeryHighBlobId { get; set; } = string.Empty;
        public string HighBlobId { get; set; } = string.Empty;
        public string MediumBlobId { get; set; } = string.Empty;
        public string LowBlobId { get; set; } = string.Empty;

        public int Order { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}

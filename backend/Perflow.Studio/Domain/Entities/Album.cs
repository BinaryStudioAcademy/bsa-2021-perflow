using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Domain.Entities
{
    public class Album : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int? Year { get; set; }

        public string? IconURL { get; set; }

        public string? Description { set; get; }

        public DateTimeOffset CreatedAt { get; set; }

        public AlbumRegion AlbumRegion { get; set; }

        public bool IsPublished { get; set; }

        public bool IsSingle { get; set; }

        public int AuthorId { get; set; }
    }
}

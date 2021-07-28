using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Domain.Entities
{
    public class Album : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public AlbumType Type { get; set; }

        public string? IconURL { get; set; }

        public DateTimeOffset? PublishedAt { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}

using System;

namespace Perflow.Studio.Domain.Entities
{
    public class Song : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int? Duration { get; set; }

        public string? IconURL { get; set; }

        public string? TrackUrl { get; set; }

        public bool IsExplicit { get; set; }

        public DateTimeOffset? PublishedAt { get; set; }

        public DateTimeOffset CreatedAt { get; set; }
    }
}

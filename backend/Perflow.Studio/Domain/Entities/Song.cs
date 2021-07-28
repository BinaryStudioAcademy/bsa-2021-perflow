using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Domain.Entities
{
    public class Song : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int Duration { get; set; }

        public string? IconURL { get; set; }

        public bool HasCensorship { get; set; }

        public DateTime CreatedAt { get; set; }

        public AuthorType AuthorType { get; set; }
    }
}

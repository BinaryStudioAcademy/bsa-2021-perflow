using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Domain.Entities
{
    public class Playlist : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public PlaylistAccessType AccessType { get; set; }

        public string? IconURL { get; set; }

        private DateTimeOffset CreatedAt { get; set; }
    }
}

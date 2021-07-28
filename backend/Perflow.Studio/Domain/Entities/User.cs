using System;

namespace Perflow.Studio.Domain.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;

        public DateTime? Birthday { get; set; }

        public string? Description { get; set; }

        public string? IconURL { get; set; }
    }
}

using System;
using Perflow.Domain.Enums;
using System.Collections.Generic;

namespace Perflow.Common.DTO
{
    public sealed class PlaylistDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public string IconURL { get; set; }

        public int AuthorId { get; set; }

        public UserDTO Author { get; set; }

        public AccessType AccessType { get; set; }

        public ICollection<PlaylistSongDTO> Songs { get; set; }

        public ICollection<PlaylistReactionDTO> Reactions { get; set; }
    }
}

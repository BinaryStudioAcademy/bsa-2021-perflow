using System;
using Perflow.Domain.Enums;
using System.Collections.Generic;
using Perflow.Common.DTO.User;

namespace Perflow.Common.DTO.Playlist
{
    public sealed class PlaylistDTO
    {
        public int Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
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

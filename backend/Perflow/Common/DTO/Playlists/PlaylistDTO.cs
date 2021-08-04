using System;
using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Playlists
{
    public class PlaylistDTO
    {
        public int Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public string IconURL { get; set; }

        public UserReadDTO Author { get; set; }

        public AccessTypeDTO AccessType { get; set; }
    }
}

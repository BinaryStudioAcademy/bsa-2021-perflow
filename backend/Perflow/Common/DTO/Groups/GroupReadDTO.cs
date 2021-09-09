using System;
using System.Collections.Generic;
using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Groups
{
    public class GroupReadDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ArtistReadDTO> Users { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}

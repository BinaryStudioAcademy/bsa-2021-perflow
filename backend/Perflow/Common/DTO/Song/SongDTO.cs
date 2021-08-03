using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Perflow.Common.DTO.Enums;
using Perflow.Common.DTO.User;

namespace Perflow.Common.DTO.Song
{
    public class SongDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public string IconUrl { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public AuthorType AuthorType { get; set; }
        public UserDTO Artist { get; set; }
        public bool HasCensorship { get; set; }
    }
}

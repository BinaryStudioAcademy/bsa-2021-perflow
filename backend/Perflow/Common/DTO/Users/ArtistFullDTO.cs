using Perflow.Common.DTO.Albums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Users
{
    public class ArtistFullDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public bool IsLiked { get; set; }
        public IEnumerable<AlbumReadDTO> Albums { get; set; }
    }
}

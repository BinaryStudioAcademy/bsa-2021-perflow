using Perflow.Common.DTO.Albums;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Users
{
    public class ArtistDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public IEnumerable<AlbumForArtistDTO> Albums { get; set; }
    }
}

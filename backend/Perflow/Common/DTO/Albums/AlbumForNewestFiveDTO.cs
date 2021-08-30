using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumForNewestFiveDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconURL { get; set; }
        public bool IsLiked { get; set; }
        public int? ArtistId { get; set; }
    }
}

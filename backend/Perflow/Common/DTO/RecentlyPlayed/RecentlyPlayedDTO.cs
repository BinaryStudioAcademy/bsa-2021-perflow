using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.RecentlyPlayed
{
    public class RecentlyPlayedDTO
    {
        public int UserId { get; set; }
        public int? AlbumId { get; set; }
        public int? PlaylistId { get; set; }
        public int? ArtistId { get; set; }
        public int SongId { get; set; }
    }
}

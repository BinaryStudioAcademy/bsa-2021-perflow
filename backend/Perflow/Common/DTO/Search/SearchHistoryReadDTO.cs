using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Search
{
    public class SearchHistoryReadDTO
    {
        public int UserId { get; set; }
        public AlbumForListDTO Album { get; set; }
        public ArtistReadDTO Artist { get; set; }
        public PlaylistViewDTO Playlist { get; set; }
    }
}

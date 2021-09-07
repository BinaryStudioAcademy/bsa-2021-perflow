using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Search
{
    public class SearchHistoryWriteDTO
    {
        public int UserId { get; set; }
        public int? AlbumId { get; set; }
        public int? ArtistId { get; set; }
        public int? PlaylistId { get; set; }
        public int? GroupId { get; set; }
    }
}

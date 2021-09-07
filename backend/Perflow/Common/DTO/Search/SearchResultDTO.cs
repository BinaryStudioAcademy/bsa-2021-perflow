using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Search
{
    public class SearchResultDTO
    {
        public ICollection<SongForPlaylistSongSearchDTO> Songs { get; set; }
        public ICollection<AlbumForListDTO> Albums { get; set; }
        public ICollection<ArtistReadDTO> Artists { get; set; }
        public ICollection<PlaylistViewDTO> Playlists { get; set; }
        public ICollection<GroupShortDTO> Groups { get; set; }
    }
}

using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Songs
{
    public class RecentlyPlayedSongDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserForPlaylistDTO Artist { get; set; }
        public GroupForPlaylistDTO Group { get; set; }
        public AlbumForPlaylistDTO Album { get; set; }
        public PlaylistNameDTO Playlist { get; set; }
    }
}

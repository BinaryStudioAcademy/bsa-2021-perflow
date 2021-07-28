using Perflow.Common.DTO.Playlist;
using Perflow.Common.DTO.Song;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO
{
    public class PlaylistSongDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public int PlaylistId { get; set; }
        public int SongId { get; set; }

        public PlaylistDTO Playlist { get; set; }
        public SongDTO Song { get; set; }
    }
}

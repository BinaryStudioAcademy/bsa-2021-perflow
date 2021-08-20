using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class RecentlyPlayed : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int? AlbumId { get; set; }
        public Album Album { get; set; }
        public int? PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
        public int? ArtistId { get; set; }
        public User Artist { get; set; }
        public int SongId { get; set; }
        public Song Song { get; set; }
        public int Frequency { set; get; }
        public DateTime LastTimeListened { get; set; }
    }
}

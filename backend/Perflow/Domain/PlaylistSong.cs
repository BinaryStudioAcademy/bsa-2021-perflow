using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class PlaylistSong : AuditEntity
    { 
        public int PlaylistId { get; set; }
        public int SongId { get; set; }

        public Playlist Playlist { get; set; }
        public Song Song { get; set; }

    }
}

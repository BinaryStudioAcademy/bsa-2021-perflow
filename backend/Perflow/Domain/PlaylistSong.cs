using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class PlaylistSong : BaseEntity
    { 
        public int PlaylistId { get; set; }
        public int SongId { get; set; }

        public Playlist Playlist { get; set; }
        public Song Song { get; set; }

        private DateTimeOffset _createdAt;
        public DateTimeOffset CreatedAt
        {
            get => _createdAt;
            set => _createdAt = (value == DateTimeOffset.MinValue) ? DateTimeOffset.Now : value;
        }
        public PlaylistSong()
        {
            CreatedAt = DateTimeOffset.Now;
        }
    }
}

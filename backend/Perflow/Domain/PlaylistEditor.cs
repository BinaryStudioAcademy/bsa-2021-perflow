using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class PlaylistEditor : BaseEntity
    {
        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

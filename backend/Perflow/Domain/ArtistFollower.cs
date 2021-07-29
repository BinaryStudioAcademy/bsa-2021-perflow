using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class ArtistFollower : BaseEntity
    {
        public int ArtistId { get; set; }
        public User Artist { get; set; }

        public int FollowerId { get; set; }
        public User Follower { get; set; }
    }
}

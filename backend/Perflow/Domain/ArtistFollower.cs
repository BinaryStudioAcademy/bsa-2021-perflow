using Perflow.Domain.Abstract;

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

using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class GroupFollower : BaseEntity
    {
        public int GroupId { get; set; }

        public Group Group { get; set; }

        public int FollowerId { get; set; }

        public User Follower { get; set; }
    }
}

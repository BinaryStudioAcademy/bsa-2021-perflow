
namespace Perflow.Common.DTO.User
{
    public class ArtistFollowerDTO
    {
        public int ArtistId { get; set; }
        public UserDTO Artist { get; set; }
        public int FollowerId { get; set; }
        public UserDTO Follower { get; set; }
    }
}

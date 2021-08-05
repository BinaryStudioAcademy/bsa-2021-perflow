namespace Perflow.Common.DTO.Users
{
    public class ArtistFollowerDTO
    {
        public int ArtistId { get; set; }
        public UserReadDTO Artist { get; set; }
        public int FollowerId { get; set; }
        public UserReadDTO Follower { get; set; }
    }
}

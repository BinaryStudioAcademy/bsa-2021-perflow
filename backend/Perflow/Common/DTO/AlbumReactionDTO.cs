namespace Perflow.Common.DTO
{
    public class AlbumReactionDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public int AlbumId { get; set; }
        public AlbumDTO Album { get; set; }
    }
}

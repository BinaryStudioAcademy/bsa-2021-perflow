using Perflow.Common.DTO.User;

namespace Perflow.Common.DTO.Artist
{
    public class ArtistReactionDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public UserDTO User { get; set; }
        public int ArtistId { get; set; }
        public UserDTO Artist { get; set; }
    }
}

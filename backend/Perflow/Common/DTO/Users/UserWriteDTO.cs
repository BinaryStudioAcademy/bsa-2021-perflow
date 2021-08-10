using Shared.Auth;

namespace Perflow.Common.DTO.Users
{
    public class UserWriteDTO
    {
        public string FirebaseId { get; set; }

        public UserRole Role { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
    }
}

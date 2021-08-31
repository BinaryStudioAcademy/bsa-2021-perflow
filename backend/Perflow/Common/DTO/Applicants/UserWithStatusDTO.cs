using Shared.Auth;

namespace Perflow.Common.DTO.Applicants
{
    public class UserWithStatusDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public UserRole Role { get; set; }
    }
}

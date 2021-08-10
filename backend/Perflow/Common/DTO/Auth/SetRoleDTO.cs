using Shared.Auth;

namespace Perflow.Common.DTO.Auth
{
    public class SetRoleDTO
    {
        public int TargetUserId { get; set; }

        public UserRole Role { get; set; }
    }
}

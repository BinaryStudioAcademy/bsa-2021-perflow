using Shared.Auth;

namespace Perflow.Common.DTO.Applicants
{
    public class EditUserRoleDTO
    {
        public int Id { get; set; }
        public UserRole Role { get; set; }
    }
}

namespace Perflow.Common.DTO.Users
{
    public class UserChangePasswordDTO
    {
        public int Id { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}

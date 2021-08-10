namespace Perflow.Common.DTO.Auth
{
    public class LoginDTO
    {
        public string AccessToken { get; set; }

        public string FirebaseId { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }
    }
}

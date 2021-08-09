using FirebaseAdmin.Auth;

namespace Shared.Auth.Models
{
    public class AuthServiceError
    {
        public string Message { get; set; } = string.Empty;

        public FirebaseAuthException? FirebaseException { get; set; }
    }
}

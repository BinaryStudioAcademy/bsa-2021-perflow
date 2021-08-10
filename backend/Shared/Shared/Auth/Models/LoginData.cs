namespace Shared.Auth.Models
{
    public record LoginData(
        string AccessToken,
        string FirebaseId,
        string Email,
        string UserName
    );
}

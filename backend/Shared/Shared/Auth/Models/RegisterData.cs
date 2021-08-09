namespace Shared.Auth.Models
{
    public record RegisterData(
        string UserName,
        string Email,
        string Password
    );
}

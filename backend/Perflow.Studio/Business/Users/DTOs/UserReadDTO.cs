using System;

namespace Perflow.Studio.Business.Users.DTOs
{
    public record UserReadDTO(
        int Id,
        string UserName,
        string Email,
        string Country,
        DateTime? Birthday,
        string? Description,
        string? IconURL
    );
}

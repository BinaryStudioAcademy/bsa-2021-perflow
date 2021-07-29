using System;

namespace Perflow.Studio.Business.Users.DTOs
{
    public record UserWriteDTO(
        string UserName,
        string Email,
        string Country,
        DateTimeOffset? Birthday,
        string? Description,
        string? IconURL
    );
}

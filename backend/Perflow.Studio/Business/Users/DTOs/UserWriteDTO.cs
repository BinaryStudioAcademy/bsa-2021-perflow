using System;

namespace Perflow.Studio.Business.Users.DTOs
{
    public record UserWriteDTO(
        DateTimeOffset? Birthday,
        string? Description,
        string? IconURL
    );
}

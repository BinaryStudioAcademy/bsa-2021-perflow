using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Playlists.DTOs
{
    public record PlaylistReadDTO(
        int Id,
        string Name,
        string? Description,
        PlaylistAccessType AccessType,
        string? IconURL,
        DateTimeOffset CreatedAt
    );
}

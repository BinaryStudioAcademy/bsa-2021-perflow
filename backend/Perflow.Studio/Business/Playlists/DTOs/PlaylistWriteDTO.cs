using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Playlists.DTOs
{
    public record PlaylistWriteDTO(
        string Name,
        string? Description,
        PlaylistAccessType AccessType,
        string? IconURL
    );
}

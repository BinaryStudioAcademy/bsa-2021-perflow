using System;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public record SongReadDTO(
        int Id,
        string Name,
        int? Duration,
        string? IconURL,
        string? TrackURL,
        bool IsExplicit,
        DateTimeOffset? PublishedAt,
        DateTimeOffset CreatedAt
    );
}

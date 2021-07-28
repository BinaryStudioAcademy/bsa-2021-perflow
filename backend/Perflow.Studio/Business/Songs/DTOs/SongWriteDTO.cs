using System;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public record SongWriteDTO(
        string Name,
        int? Duration,
        string? IconURL,
        string? TrackURL,
        bool IsExplicit,
        DateTimeOffset? PublishedAt
    );
}

using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public record SongWriteDTO(
        string Name,
        int Duration,
        string? IconURL,
        bool HasCensorship,
        AuthorType AuthorType
    );
}

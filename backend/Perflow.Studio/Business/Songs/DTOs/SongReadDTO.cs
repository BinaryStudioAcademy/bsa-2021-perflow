using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Songs.DTOs
{
    public record SongReadDTO(
        int Id,
        string Name,
        int Duration,
        string? IconURL,
        bool HasCensorship,
        DateTime CreatedAt,
        AuthorType AuthorType
    );
}

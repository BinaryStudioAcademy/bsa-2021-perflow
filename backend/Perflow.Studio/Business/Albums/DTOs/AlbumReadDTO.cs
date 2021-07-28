using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Albums.DTOs
{
    public record AlbumReadDTO(
        int Id,
        string Name,
        string? Description,
        AlbumType Type,
        string? IconURL,
        DateTimeOffset? PublishedAt,
        DateTimeOffset CreatedAt
    );
}

using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Albums.DTOs
{
    public record AlbumWriteDTO(
        string Name,
        string? Description,
        AlbumType Type,
        string? IconURL,
        DateTimeOffset? PublishedAt
    );
}

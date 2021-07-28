using System;
using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Albums.DTOs
{
    public record AlbumReadDTO(
        int Id,
        string Name,
        int? Year,
        string? IconURL,
        string? Description,
        DateTime CreatedAt,
        AlbumRegion AlbumRegion,
        bool IsPublished,
        bool IsSingle,
        int AuthorId
    );
}

using Perflow.Studio.Domain.Enums;

namespace Perflow.Studio.Business.Albums.DTOs
{
    public record AlbumWriteDTO(
        string Name,
        int? Year,
        string? IconURL,
        string? Description,
        AlbumRegion AlbumRegion,
        bool IsPublished,
        bool IsSingle,
        int AuthorId
    );
}

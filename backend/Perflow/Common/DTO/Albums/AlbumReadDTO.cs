using System;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;
using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Albums
{
    public record AlbumReadDTO(
        int Id,
        string Name,
        int? ReleaseYear,
        string IconURL,
        string Description,
        AlbumRegion Region,
        bool IsPublished,
        AuthorType AuthorType,
        int? AuthorId,
        ArtistReadDTO Author,
        int? GroupId,
        GroupReadDTO Group,
        bool IsSingle,
        DateTimeOffset CreatedAt
    );
}

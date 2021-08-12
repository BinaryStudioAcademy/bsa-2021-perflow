using System;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;
using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Songs
{
    public record SongReadDTO(
        int Id,
        string Name,
        AuthorType AuthorType,
        int? ArtistId,
        ArtistReadDTO Artist,
        int? GroupId,
        GroupReadDTO Group,
        int? AlbumId,
        AlbumReadDTO Album,
        int Duration,
        bool HasCensorship,
        string BlobId,
        DateTimeOffset CreatedAt
    );
}

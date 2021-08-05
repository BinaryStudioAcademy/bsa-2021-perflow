using System;
using System.Collections.Generic;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
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
        string IconURL,
        int Duration,
        bool HasCensorship,
        DateTimeOffset CreatedAt
    );
}

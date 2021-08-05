using System;
using System.Collections.Generic;
using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Groups
{
    public record GroupReadDTO(
        int Id,
        string Name,
        ICollection<ArtistReadDTO> Users,
        DateTimeOffset CreatedAt
    );
}

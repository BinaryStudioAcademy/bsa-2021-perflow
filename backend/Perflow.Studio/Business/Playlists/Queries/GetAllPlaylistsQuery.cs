using System.Collections.Generic;
using MediatR;
using Perflow.Studio.Business.Playlists.DTOs;

namespace Perflow.Studio.Business.Playlists.Queries
{
    public class GetAllPlaylistsQuery : IRequest<IEnumerable<PlaylistReadDTO>>
    {

    }
}

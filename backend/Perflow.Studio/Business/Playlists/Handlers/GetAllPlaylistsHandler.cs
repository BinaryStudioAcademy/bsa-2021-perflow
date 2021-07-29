using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Playlists.DTOs;
using Perflow.Studio.Business.Playlists.Queries;

namespace Perflow.Studio.Business.Playlists.Handlers
{
    public class GetAllPlaylistsHandler : IRequestHandler<GetAllPlaylistsQuery, IEnumerable<PlaylistReadDTO>>
    {
        public Task<IEnumerable<PlaylistReadDTO>> Handle(GetAllPlaylistsQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

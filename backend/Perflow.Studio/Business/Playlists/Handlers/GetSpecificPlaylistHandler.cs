using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Playlists.DTOs;
using Perflow.Studio.Business.Playlists.Queries;

namespace Perflow.Studio.Business.Playlists.Handlers
{
    public class GetSpecificPlaylistHandler : IRequestHandler<GetSpecificPlaylistQuery, PlaylistReadDTO?>
    {
        public Task<PlaylistReadDTO?> Handle(GetSpecificPlaylistQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

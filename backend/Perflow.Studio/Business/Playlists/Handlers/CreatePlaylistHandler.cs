using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Playlists.Commands;
using Perflow.Studio.Business.Playlists.DTOs;

namespace Perflow.Studio.Business.Playlists.Handlers
{
    public class CreatePlaylistHandler : IRequestHandler<CreatePlaylistCommand, PlaylistReadDTO>
    {
        public Task<PlaylistReadDTO> Handle(CreatePlaylistCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

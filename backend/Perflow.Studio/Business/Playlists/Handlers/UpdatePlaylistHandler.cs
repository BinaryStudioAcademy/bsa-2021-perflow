using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Playlists.Commands;

namespace Perflow.Studio.Business.Playlists.Handlers
{
    public class UpdatePlaylistHandler : IRequestHandler<UpdatePlaylistCommand, OneOf<Success, NotFound>>
    {
        public Task<OneOf<Success, NotFound>> Handle(UpdatePlaylistCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Albums.Commands;

namespace Perflow.Studio.Business.Albums.Handlers
{
    public class UpdateAlbumHandler : IRequestHandler<UpdateAlbumCommand, OneOf<Success, NotFound>>
    {
        public Task<OneOf<Success, NotFound>> Handle(UpdateAlbumCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

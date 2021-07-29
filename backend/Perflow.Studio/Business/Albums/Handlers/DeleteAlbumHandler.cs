using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Albums.Commands;

namespace Perflow.Studio.Business.Albums.Handlers
{
    public class DeleteAlbumHandler : IRequestHandler<DeleteAlbumCommand, OneOf<Success, NotFound>>
    {
        public Task<OneOf<Success, NotFound>> Handle(DeleteAlbumCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Albums.Commands;
using Perflow.Studio.Business.Albums.DTOs;

namespace Perflow.Studio.Business.Albums.Handlers
{
    public class CreateAlbumHandler : IRequestHandler<CreateAlbumCommand, AlbumReadDTO>
    {
        public Task<AlbumReadDTO> Handle(CreateAlbumCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

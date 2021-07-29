using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Albums.DTOs;
using Perflow.Studio.Business.Albums.Queries;

namespace Perflow.Studio.Business.Albums.Handlers
{
    public class GetSpecificAlbumHandler : IRequestHandler<GetSpecificAlbumQuery, AlbumReadDTO?>
    {
        public Task<AlbumReadDTO?> Handle(GetSpecificAlbumQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

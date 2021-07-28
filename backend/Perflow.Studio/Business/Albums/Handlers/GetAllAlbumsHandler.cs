using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Albums.DTOs;
using Perflow.Studio.Business.Albums.Queries;

namespace Perflow.Studio.Business.Albums.Handlers
{
    public class GetAllAlbumsHandler : IRequestHandler<GetAllAlbumsQuery, IEnumerable<AlbumReadDTO>>
    {
        public Task<IEnumerable<AlbumReadDTO>> Handle(GetAllAlbumsQuery request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}

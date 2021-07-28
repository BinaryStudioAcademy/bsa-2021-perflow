using System.Collections.Generic;
using MediatR;
using Perflow.Studio.Business.Albums.DTOs;

namespace Perflow.Studio.Business.Albums.Queries
{
    public class GetAllAlbumsQuery : IRequest<IEnumerable<AlbumReadDTO>>
    {

    }
}

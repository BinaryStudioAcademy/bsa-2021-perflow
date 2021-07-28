using System.Collections.Generic;
using MediatR;
using Perflow.Studio.Business.Songs.DTOs;

namespace Perflow.Studio.Business.Songs.Queries
{
    public class GetAllSongsQuery : IRequest<IEnumerable<SongReadDTO>>
    {

    }
}

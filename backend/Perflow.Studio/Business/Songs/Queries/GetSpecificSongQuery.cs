using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.DTOs;

namespace Perflow.Studio.Business.Songs.Queries
{
    public class GetSpecificSongQuery : IRequest<OneOf<SongReadDTO, NotFound>>
    {
        public int Id { get; }

        public GetSpecificSongQuery(int id)
        {
            Id = id;
        }
    }
}

using MediatR;
using Perflow.Studio.Business.Albums.DTOs;

namespace Perflow.Studio.Business.Albums.Queries
{
    public class GetSpecificAlbumQuery : IRequest<AlbumReadDTO?>
    {
        public int Id { get; }

        public GetSpecificAlbumQuery(int id)
        {
            Id = id;
        }
    }
}

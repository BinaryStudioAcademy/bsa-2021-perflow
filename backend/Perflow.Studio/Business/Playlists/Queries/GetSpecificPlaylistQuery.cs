using MediatR;
using Perflow.Studio.Business.Playlists.DTOs;

namespace Perflow.Studio.Business.Playlists.Queries
{
    public class GetSpecificPlaylistQuery : IRequest<PlaylistReadDTO?>
    {
        public int Id { get; }

        public GetSpecificPlaylistQuery(int id)
        {
            Id = id;
        }
    }
}

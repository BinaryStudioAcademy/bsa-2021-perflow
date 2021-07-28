using MediatR;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Playlists.Commands
{
    public class DeletePlaylistCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public DeletePlaylistCommand(int id)
        {
            Id = id;
        }
    }
}

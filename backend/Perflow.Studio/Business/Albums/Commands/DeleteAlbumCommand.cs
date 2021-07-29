using MediatR;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Albums.Commands
{
    public class DeleteAlbumCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public DeleteAlbumCommand(int id)
        {
            Id = id;
        }
    }
}

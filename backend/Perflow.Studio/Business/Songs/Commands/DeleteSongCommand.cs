using MediatR;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class DeleteSongCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public DeleteSongCommand(int id)
        {
            Id = id;
        }
    }
}

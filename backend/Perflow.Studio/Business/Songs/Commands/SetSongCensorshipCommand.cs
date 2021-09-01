using MediatR;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class SetSongCensorshipCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public bool Value { get; }

        public SetSongCensorshipCommand(int id, bool value)
        {
            Id = id;
            Value = value;
        }
    }
}

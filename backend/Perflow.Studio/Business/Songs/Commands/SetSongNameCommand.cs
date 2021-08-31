using MediatR;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class SetSongNameCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public string Value { get; }

        public SetSongNameCommand(int id, string value)
        {
            Id = id;
            Value = value;
        }
    }
}

using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Playlists.DTOs;

namespace Perflow.Studio.Business.Playlists.Commands
{
    public class UpdatePlaylistCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public PlaylistWriteDTO Dto { get; }

        public UpdatePlaylistCommand(int id, PlaylistWriteDTO dto)
        {
            Id = id;
            Dto = dto;
        }
    }
}

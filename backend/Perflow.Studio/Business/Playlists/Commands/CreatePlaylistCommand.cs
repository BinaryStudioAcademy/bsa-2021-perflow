using MediatR;
using Perflow.Studio.Business.Playlists.DTOs;

namespace Perflow.Studio.Business.Playlists.Commands
{
    public class CreatePlaylistCommand : IRequest<PlaylistReadDTO>
    {
        public PlaylistWriteDTO Dto { get; }

        public CreatePlaylistCommand(PlaylistWriteDTO dto)
        {
            Dto = dto;
        }
    }
}

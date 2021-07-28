using MediatR;
using Perflow.Studio.Business.Albums.DTOs;

namespace Perflow.Studio.Business.Albums.Commands
{
    public class CreateAlbumCommand : IRequest<AlbumReadDTO>
    {
        public AlbumWriteDTO Dto { get; }

        public CreateAlbumCommand(AlbumWriteDTO dto)
        {
            Dto = dto;
        }
    }
}

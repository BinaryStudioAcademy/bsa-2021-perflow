using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Albums.DTOs;

namespace Perflow.Studio.Business.Albums.Commands
{
    public class UpdateAlbumCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public AlbumWriteDTO Dto { get; }

        public UpdateAlbumCommand(int id, AlbumWriteDTO dto)
        {
            Id = id;
            Dto = dto;
        }
    }
}

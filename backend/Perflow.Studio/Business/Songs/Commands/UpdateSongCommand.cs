using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.DTOs;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class UpdateSongCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public SongWriteDTO Dto { get; }

        public UpdateSongCommand(int id, SongWriteDTO dto)
        {
            Id = id;
            Dto = dto;
        }
    }
}

using MediatR;
using Perflow.Studio.Business.Songs.DTOs;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class CreateSongCommand : IRequest<SongReadDTO>
    {
        public SongWriteDTO Dto { get; }

        public int AuthorId { get; }

        public CreateSongCommand(int authorId, SongWriteDTO dto)
        {
            AuthorId = authorId;
            Dto = dto;
        }
    }
}

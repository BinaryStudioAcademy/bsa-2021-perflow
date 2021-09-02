using MediatR;
using Microsoft.AspNetCore.Http;
using OneOf;
using OneOf.Types;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class UploadSongFileCommand : IRequest<OneOf<Success, Error<string>>>
    {
        public int SongId { get; set; }

        public IFormFile SongFile { get; set; }

        public UploadSongFileCommand(int songId, IFormFile songFile)
        {
            SongId = songId;
            SongFile = songFile;
        }
    }
}

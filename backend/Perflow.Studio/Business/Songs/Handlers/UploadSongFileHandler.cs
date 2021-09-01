using System.Threading;
using System.Threading.Tasks;
using OneOf;
using MediatR;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Services.Interfaces;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class UploadSongFileHandler : IRequestHandler<UploadSongFileCommand, OneOf<Success, Error<string>>>
    {
        private readonly ISongFilesService _songFilesService;

        public UploadSongFileHandler(ISongFilesService songFilesService)
        {
            _songFilesService = songFilesService;
        }

        public async Task<OneOf<Success, Error<string>>> Handle(UploadSongFileCommand request, CancellationToken cancellationToken)
        {
            return await _songFilesService.UploadSongFileAsync(request.SongId, request.SongFile);
        }
    }
}

using System.Data;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Services.Extensions.DapperExtensions;
using Perflow.Studio.Services.Interfaces;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class DeleteSongHandler : IRequestHandler<DeleteSongCommand, OneOf<Success, NotFound>>
    {
        private readonly IDbConnection _connection;
        private readonly ISongsRecognitionService _songsRecognitionService;
        private readonly ISongFilesService _songFilesService;

        public DeleteSongHandler(ISongFilesService songFilesService, IDbConnection connection, ISongsRecognitionService songsRecognitionService)
        {
            _songFilesService = songFilesService;
            _connection = connection;
            _songsRecognitionService = songsRecognitionService;
        }

        public async Task<OneOf<Success, NotFound>> Handle(DeleteSongCommand request, CancellationToken cancellationToken)
        {
            _ = _songsRecognitionService.DeleteSongFingerprintsAsync(request.Id);
            var filesDeletionResult = await _songFilesService.DeleteSongFilesAsync(request.Id);

            if (filesDeletionResult.IsT1)
            {
                return new NotFound();
            }

            await _connection.SongDeleteAsync(request.Id);

            return new Success();
        }
    }
}

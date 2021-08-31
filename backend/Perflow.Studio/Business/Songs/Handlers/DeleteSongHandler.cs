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
        private readonly ISongFilesService _songFilesService;

        public DeleteSongHandler(ISongFilesService songFilesService, IDbConnection connection)
        {
            _songFilesService = songFilesService;
            _connection = connection;
        }

        public async Task<OneOf<Success, NotFound>> Handle(DeleteSongCommand request, CancellationToken cancellationToken)
        {
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

using System.Threading.Tasks;
using Perflow.Studio.Services.Interfaces;
using Shared.SongRecognition.Services;

namespace Perflow.Studio.Services.Implementations
{
    public class SongsRecognitionService : ISongsRecognitionService
    {
        private readonly IModelServiceFactory _songsModelServiceFactory;

        public SongsRecognitionService(IModelServiceFactory songsModelServiceFactory)
        {
            _songsModelServiceFactory = songsModelServiceFactory;
        }

        public Task DeleteSongFingerprintsAsync(int songId)
        {
            using var emyService = _songsModelServiceFactory.CreateModelService();
            emyService.DeleteTrack(songId.ToString());
            return Task.CompletedTask;
        }
    }
}

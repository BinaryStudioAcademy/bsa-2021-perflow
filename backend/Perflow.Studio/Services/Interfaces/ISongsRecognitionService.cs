using System.Threading.Tasks;

namespace Perflow.Studio.Services.Interfaces
{
    public interface ISongsRecognitionService
    {
        public Task DeleteSongFingerprintsAsync(int songId);
    }
}

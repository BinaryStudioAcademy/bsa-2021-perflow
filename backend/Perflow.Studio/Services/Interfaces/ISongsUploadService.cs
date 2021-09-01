using Shared.Processor.Models;

namespace Perflow.Studio.Services.Interfaces
{
    public interface ISongsUploadService
    {
        public void UploadSong(SongProcessingOptions options);
    }
}

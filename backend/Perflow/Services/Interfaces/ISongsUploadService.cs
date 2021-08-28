using Shared.Processor.Models;

namespace Perflow.Services.Interfaces
{
    public interface ISongsUploadService
    {
        public void UploadSong(SongProcessingOptions options);
    }
}

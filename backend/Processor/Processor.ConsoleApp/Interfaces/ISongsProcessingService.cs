using System.Threading.Tasks;
using Shared.Processor.Models;

namespace Processor.ConsoleApp.Interfaces
{
    public interface ISongsProcessingService
    {
        public string TempPath { get; }

        public Task ProcessSongs(SongProcessingOptions options);

        public Task PrepareSongForRecognition(string sourcePath, string preparedSongPath);

        public Task ProcessSongFingerprint(string sourcePath, int id);
    }
}

using System.Threading.Tasks;
using Shared.Processor.Models;

namespace Processor.ConsoleApp.Interfaces
{
    public interface ISongsRecognitionService
    {
        public Task<SongRecognitionResult> RecognizeSong(SongRecognitionOptions options);
    }
}

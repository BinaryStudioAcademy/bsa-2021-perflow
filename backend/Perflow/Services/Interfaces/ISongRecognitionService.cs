using System.Threading.Tasks;
using Shared.Processor.Models;

namespace Perflow.Services.Interfaces
{
    public interface ISongRecognitionService
    {
        public Task<SongRecognitionResult> RecognizeAsync(SongRecognitionOptions options);
    }
}

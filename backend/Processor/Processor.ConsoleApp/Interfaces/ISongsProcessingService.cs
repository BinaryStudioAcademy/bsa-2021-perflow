using System.Threading.Tasks;
using Shared.Processor.Models;

namespace Processor.ConsoleApp.Interfaces
{
    public interface ISongsProcessingService
    {
        public Task ProcessSongs(SongProcessingOptions options);
    }
}

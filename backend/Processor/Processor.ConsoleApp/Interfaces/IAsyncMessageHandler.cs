using System.Threading;
using System.Threading.Tasks;

namespace Processor.ConsoleApp.Interfaces
{
    public interface IAsyncMessageHandler
    {
        public Task StartAsync(CancellationToken cancellationToken);
    }
}

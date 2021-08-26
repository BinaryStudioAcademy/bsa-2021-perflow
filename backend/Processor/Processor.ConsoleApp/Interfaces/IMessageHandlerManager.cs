using System.Threading;

namespace Processor.ConsoleApp.Interfaces
{
    public interface IMessageHandlerManager
    {
        public void Start(CancellationToken cancellationToken);
    }
}

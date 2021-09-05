using System.Threading.Tasks;
using Perflow.Common.DTO.ContentSynchronization;

namespace Perflow.Hubs.Interfaces
{
    public interface ISynchronizationHub
    {
        Task ReceiveSynchronization(ContentSyncReadDTO syncDto);
    }
}

using System.Threading.Tasks;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Common.DTO.Hub;

namespace Perflow.Hubs.Interfaces
{
    public interface ISharePlayHub
    {
        Task ResendSynchronization(SharePlayDataDTO syncDto);
        Task CheckStatus(CheckStatusDTO checkDto);
    }
}

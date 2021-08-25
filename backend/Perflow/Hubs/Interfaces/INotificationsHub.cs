using Perflow.Domain;
using System.Threading.Tasks;

namespace Perflow.Hubs.Interfaces
{
    public interface INotificationsHub
    {
        Task SendNotification(Notification notification);
    }
}

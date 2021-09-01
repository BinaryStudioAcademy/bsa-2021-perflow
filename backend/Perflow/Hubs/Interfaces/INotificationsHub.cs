using Perflow.Common.DTO.Notifications;
using System.Threading.Tasks;

namespace Perflow.Hubs.Interfaces
{
    public interface INotificationsHub
    {
        Task SendNotification(NotificationReadDTO notification);
    }
}

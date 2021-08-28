using Perflow.Domain.Enums;
using Perflow.Common.DTO.Notifications;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface INotificationService
    {
        Task CreateNotificationAsync(NotificationWriteDTO notification, int id, AuthorType type);

        Task SendNotificationToGroupAsync(NotificationWriteDTO notification, string groupName);

        Task<IEnumerable<NotificationReadDTO>> GetAll(int userId);

        Task MarkAllAsRead(int userId);

    }
}

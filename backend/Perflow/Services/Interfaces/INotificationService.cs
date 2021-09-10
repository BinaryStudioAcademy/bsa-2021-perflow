using Perflow.Common.DTO.Notifications;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface INotificationService
    {
        Task<IEnumerable<NotificationReadDTO>> CreateNotificationAsync(NotificationWriteDTO notification, int[] subscribersIds);

        Task<NotificationReadDTO> CreateNotificationAsync(NotificationWriteDTO notification, int subscriberId, bool autoSaveChanges = true);

        Task SendNotificationAsync(IEnumerable<NotificationReadDTO> notifications);

        Task SendNotificationAsync(NotificationReadDTO notification);

        Task<IEnumerable<NotificationReadDTO>> GetAll(int userId);

        Task MarkAllAsReadAsync(int userId);

        Task ChangeStateAsync(NotificationChangeStateDTO notificationChangeState);

        Task DeleteNotificationAsync(int id);

        Task<NotificationReadDTO> CreateApplicantNotificationAsync(NotificationWriteDTO notification, int applicantId);
    }
}

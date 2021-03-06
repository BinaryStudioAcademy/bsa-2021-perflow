using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Notifications;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Hubs.Implementations;
using Perflow.Hubs.Interfaces;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class NotificationService : BaseService, INotificationService
    {
        private readonly IHubContext<NotificationsHub, INotificationsHub> _hubContext;

        private const int maxNumberOfDaysToStoreNotification = 30;

        public NotificationService(PerflowContext context, IMapper mapper, IHubContext<NotificationsHub, INotificationsHub> hubContext)
            : base(context, mapper)
        {
            _hubContext = hubContext;
        }

        public async Task<IEnumerable<NotificationReadDTO>> CreateNotificationAsync(NotificationWriteDTO notification, int[] subscribersIds)
        {
            var notifications = new List<Notification>();

            foreach (var subscriberId in subscribersIds)
            {
                var entity = context.Notifications.Add(new Notification
                {
                    Description = notification.Description,
                    Title = notification.Title,
                    Type = notification.Type,
                    UserId = subscriberId,
                    Reference = notification.Reference
                });

                notifications.Add(entity.Entity);
            }

            await context.SaveChangesAsync();

            await DeleteOlderThanAsync(maxNumberOfDaysToStoreNotification);

            return mapper.Map<IEnumerable<NotificationReadDTO>>(notifications);
        }

        public async Task<NotificationReadDTO> CreateNotificationAsync(NotificationWriteDTO notification, int subscriberId, bool autoSaveChanges = true)
        {
            var notif = await context.Notifications.AddAsync(new Notification
            {
                Description = notification.Description,
                Title = notification.Title,
                Type = notification.Type,
                UserId = subscriberId,
                Reference = notification.Reference
            });

            if (autoSaveChanges)
                await context.SaveChangesAsync();

            await DeleteOlderThanAsync(maxNumberOfDaysToStoreNotification);

            return mapper.Map<NotificationReadDTO>(notif.Entity);
        }

        public async Task SendNotificationAsync(IEnumerable<NotificationReadDTO> notifications)
        {
            foreach (var notification in notifications)
            {
                await _hubContext.Clients.User(notification.UserId.ToString()).SendNotification(notification);
            }
        }

        public async Task SendNotificationAsync(NotificationReadDTO notification)
        {
            await _hubContext.Clients.User(notification.UserId.ToString()).SendNotification(notification);
        }

        public async Task<IEnumerable<NotificationReadDTO>> GetAll(int userId)
        {
            var notifications = await context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return mapper.Map<IEnumerable<NotificationReadDTO>>(notifications);
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var notifications = context.Notifications
                .Where(n => n.UserId == userId);

            await notifications.ForEachAsync(n => n.IsRead = true);

            context.Notifications.UpdateRange(notifications);

            await context.SaveChangesAsync();
        }

        public async Task ChangeStateAsync(NotificationChangeStateDTO notificationChangeState)
        {
            var notification = await context.Notifications.FirstOrDefaultAsync(n => n.Id == notificationChangeState.Id);

            if (notification == null)
            {
                throw new NotFoundExcepion($"{nameof(Notification)} not found");
            }

            notification.IsRead = notificationChangeState.IsRead;

            await context.SaveChangesAsync();
        }

        public async Task DeleteNotificationAsync(int id)
        {
            var notification = await context.Notifications.FirstOrDefaultAsync(n => n.Id == id);

            if (notification == null)
            {
                throw new NotFoundExcepion($"{nameof(Notification)} not found");
            }

            context.Notifications.Remove(notification);

            await context.SaveChangesAsync();
        }

        private async Task DeleteOlderThanAsync(int numberOfDays)
        {
            var date = DateTimeOffset.Now.AddDays(-numberOfDays);

            var notifications = context.Notifications
                .Where(n => n.CreatedAt < date);

            context.Notifications.RemoveRange(notifications);

            await context.SaveChangesAsync();
        }

        public async Task<NotificationReadDTO> CreateApplicantNotificationAsync(NotificationWriteDTO notification, int applicantId)
        {
            var entity = await context.Notifications.AddAsync(new Notification
            {
                Description = notification.Description,
                Title = notification.Title,
                Type = notification.Type,
                UserId = applicantId,
                Reference = notification.Reference
            });

            await context.SaveChangesAsync();

            _ = DeleteOlderThanAsync(maxNumberOfDaysToStoreNotification);

            return mapper.Map<NotificationReadDTO>(entity.Entity);
        }

    }
}

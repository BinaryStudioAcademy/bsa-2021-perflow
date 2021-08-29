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

        public async Task CreateNotificationAsync(NotificationWriteDTO notification, int id, AuthorType type)
        {
            var subscribersIds = (type == AuthorType.Artist)
                ? await GetArtistSubscribersAsync(id)
                : await GetGroupSubscribersAsync(id);

            var notifications = subscribersIds
                .Select(subscriber => new Notification
                {
                    Description = notification.Description,
                    Title = notification.Title,
                    Type = notification.Type,
                    UserId = subscriber,
                    Reference = notification.Reference
                });

            await context.Notifications.AddRangeAsync(notifications);

            await context.SaveChangesAsync();

            _ = DeleteOlderThan(maxNumberOfDaysToStoreNotification);
        }

        public async Task SendNotificationToGroupAsync(NotificationWriteDTO notification, string groupName)
        {
            await _hubContext.Clients.Group(groupName).SendNotification(notification);
        }

        public async Task<IEnumerable<NotificationReadDTO>> GetAll(int userId)
        {
            var notifications = await context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return mapper.Map<IEnumerable<NotificationReadDTO>>(notifications);
        }

        public async Task MarkAllAsRead(int userId)
        {
            var notifications = context.Notifications
                .Where(n => n.UserId == userId);

            await notifications.ForEachAsync(n => n.IsRead = true);

            context.Notifications.UpdateRange(notifications);

            await context.SaveChangesAsync();
        }

        private async Task DeleteOlderThan(int numberOfDays)
        {
            var date = DateTimeOffset.Now.AddDays(-numberOfDays);

            var notifications = context.Notifications
                .Where(n => n.CreatedAt < date);

            context.Notifications.RemoveRange(notifications);

            await context.SaveChangesAsync();
        }

        private async Task<int[]> GetArtistSubscribersAsync(int id)
        {
            return await context.ArtistReactions
                    .Where(ar => ar.ArtistId == id)
                    .Select(ar => ar.UserId)
                    .ToArrayAsync();
        }

        private async Task<int[]> GetGroupSubscribersAsync(int id)
        {
            return await context.GroupReactions
                    .Where(ar => ar.GroupId == id)
                    .Select(ar => ar.UserId)
                    .ToArrayAsync();
        }
    }
}

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Common.DTO.Notifications;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class SharePlayService : BaseService
    {
        private readonly INotificationService _notificationService;

        public SharePlayService(PerflowContext context, IMapper mapper, INotificationService notificationService)
            : base(context, mapper)
        {
            _notificationService = notificationService;
        }

        public async Task NotifyGroup(SharePlayDTO dto, int userId)
        {
            var list = await context.PlaylistEditors
                .Where(pe => pe.PlaylistId == dto.PlaylistId)
                .Include(pe => pe.User)
                .Select(pe => pe.UserId)
                .ToListAsync();

            NotificationReadDTO notification = new NotificationReadDTO
            {
                CreatedAt = DateTimeOffset.Now,
                Description = "Let's together listen to: ",
                Title = "Share play",
                Type = Domain.Enums.NotificationType.SharePlayNotification,
                Reference = dto.PlaylistId
            };

            foreach (var item in list)
            {
                notification.UserId = item;
                await _notificationService.SendNotificationAsync(notification);
            }
        }
    }
}

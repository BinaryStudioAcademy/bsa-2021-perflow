using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Common.DTO.Notifications;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
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
            var check = await context.SharePlay
                .FirstOrDefaultAsync(sp => sp.PlaylistId == dto.PlaylistId);

            if (check == null)
            {
                SharePlay temp = new SharePlay
                {
                    Id = 0,
                    MasterId = userId,
                    PlaylistId = dto.PlaylistId
                };

                await context.SharePlay.AddAsync(temp);
                await context.SaveChangesAsync();
            }

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

        public async Task<bool> GetSharePlayStateAsync(int playlistId)
        {
            var result = await context.SharePlay
                .FirstOrDefaultAsync(sp => sp.PlaylistId == playlistId);

            return result != null;
        }

        public async Task RemoveRecordAsync(int playlistId)
        {
            var deleted = await context.SharePlay.FirstOrDefaultAsync(sp => sp.PlaylistId == playlistId);
            
            context.SharePlay.Remove(deleted);

            await context.SaveChangesAsync();
        }

        public async Task DeleteRecordIfMasterDisconnectedAsync(int userId)
        {
            var master = await context.SharePlay.FirstOrDefaultAsync(sp => sp.MasterId == userId);

            if (master != null)
            {
                context.SharePlay.Remove(master);
                await context.SaveChangesAsync();
            }
        }

        public async Task ClearAllRecordsAsync()
        {
            var items = await context.SharePlay.ToListAsync();

            if (items != null && items.Count != 0)
            {
                context.RemoveRange(items);
                await context.SaveChangesAsync();
            }
        }
    }
}

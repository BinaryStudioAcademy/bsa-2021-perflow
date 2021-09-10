using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Notifications;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.Helpers
{
    public class PlaylistNotifier
    {
        private readonly INotificationService _notificationService;
        private readonly PerflowContext _context;
        public PlaylistNotifier(INotificationService notificationService, PerflowContext context)
        {
            _notificationService = notificationService;
            _context = context;
        }    

        public async Task NotifyPlaylistMembers(Playlist playlist, string title, string description)
        {

            var collaborators = await _context.PlaylistEditors
                                        .Where(pe => pe.PlaylistId == playlist.Id)
                                        .Include(pe => pe.User)
                                        .Select(pe => pe.User.Id)
                                        .ToListAsync();

            collaborators.Add(playlist.AuthorId);

            foreach (var userId in collaborators)
            {
                var notification = new NotificationWriteDTO
                {
                    Title = title,
                    Description = description,
                    Reference = playlist.Id,
                    Type = NotificationType.CollaborativePlaylistSubscription,
                };

                await Notify(notification, userId);
            }

        }

        public async Task Notify(NotificationWriteDTO notification, int applicantId)
        {
            var message = await _notificationService.CreateApplicantNotificationAsync(notification, applicantId);
            await _notificationService.SendNotificationAsync(message);
        }
    }
}

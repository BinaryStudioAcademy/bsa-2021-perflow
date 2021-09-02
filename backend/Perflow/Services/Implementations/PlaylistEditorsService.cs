using AutoMapper;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using Perflow.Common.DTO.Playlists;
using Perflow.Services.Interfaces;
using Perflow.Common.DTO.Notifications;
using Perflow.Domain.Enums;

namespace Perflow.Services.Implementations
{
    public class PlaylistEditorsService : BaseService
    {
        private readonly INotificationService _notificationService;

        public PlaylistEditorsService(PerflowContext context, IMapper mapper, INotificationService notificationService) : base(context, mapper)
        {
            _notificationService = notificationService;
        }

        public async Task<IEnumerable<ArtistReadDTO>> GetCollaborators(int playlistId)
        {
            var collaborators = await context.PlaylistEditors
                                            .Where(pe => pe.PlaylistId == playlistId)
                                            .Include(pe => pe.User)
                                            .Select(pe => pe.User)
                                            .ToListAsync();

            return mapper.Map<IEnumerable<ArtistReadDTO>>(collaborators);
        }

        public async Task Add(PlaylistEditorDTO pe)
        {
            await context.PlaylistEditors.AddAsync(mapper.Map<PlaylistEditor>(pe));
            await context.SaveChangesAsync();
            await SendAddedToCollaborativeNotificationsAsync(new List<PlaylistEditorDTO> { pe });
        }

        public async Task AddCollaborators(int playlistId, IEnumerable<ArtistReadDTO> collaborators)
        {
            await this.RemovePlaylist(playlistId);
            if(collaborators.Any())
            {
                var pes = collaborators
                        .Select(u =>
                        new PlaylistEditorDTO
                        {
                            PlaylistId = playlistId,
                            UserId = u.Id
                        });

                await context.PlaylistEditors.AddRangeAsync(mapper.Map<IEnumerable<PlaylistEditor>>(pes));
                await SendAddedToCollaborativeNotificationsAsync(pes);
            }
            
            await context.SaveChangesAsync();
        }

        public async Task Remove(PlaylistEditorDTO pe)
        {
            var removeEntity = context.PlaylistEditors
                                        .FirstOrDefault(_pe => _pe.PlaylistId == pe.PlaylistId &&
                                                               _pe.UserId == pe.UserId);
            context.PlaylistEditors.Remove(removeEntity);
            
            await context.SaveChangesAsync();
        }

        public async Task RemovePlaylist(int playlistId)
        {
            var removeEntities = context.PlaylistEditors
                                        .Where(_pe => _pe.PlaylistId == playlistId);

            context.PlaylistEditors.RemoveRange(removeEntities);

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetCollaborativePlaylists(int userId)
        {
            var collaborators = await context.PlaylistEditors
                                            .Where(pe => pe.UserId == userId)
                                            .Include(pe => pe.Playlist)
                                            .Select(pe => pe.Playlist)
                                            .ToListAsync();

            return mapper.Map<IEnumerable<PlaylistViewDTO>>(collaborators);
        }

        private async Task SendAddedToCollaborativeNotificationsAsync(IEnumerable<PlaylistEditorDTO> pes)
        {
            var notifications = new List<NotificationReadDTO>();
            foreach (var pe in pes)
            {
                var playlist = await context.Playlists.FirstOrDefaultAsync(p => p.Id == pe.PlaylistId);
                var notifWrite = new NotificationWriteDTO
                {
                    Title = "New Collaborative",
                    Description = $"You've been added as a collaborative to {playlist.Name} playlist",
                    Reference = pe.PlaylistId,
                    Type = NotificationType.CollaborativePlaylistSubscription
                };

                var notif = await _notificationService.CreateNotificationAsync(notifWrite, pe.UserId, false);
                notifications.Add(notif);
            }

            await _notificationService.SendNotificationAsync(notifications);
            await context.SaveChangesAsync();
        }
    }
}

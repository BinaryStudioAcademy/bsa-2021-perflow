using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.DataAccess.Context;
using Perflow.Hubs.Interfaces;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Perflow.Hubs.Implementations
{
    [Authorize(Policy = Policies.IsUser)]
    public class SharePlayHub : Hub<ISharePlayHub>
    {
        private readonly ContentSynchronizationService _syncService;
        private readonly PerflowContext _context;
        private readonly static Dictionary<int, string> _groups = new Dictionary<int, string>();

        public SharePlayHub(ContentSynchronizationService syncService, PerflowContext context)
        {
            _syncService = syncService;
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            int id = int.Parse(Context.User.FindFirst(Claims.Id).Value);
            await RemoveFromGroup(_groups[id]);
            string temp = _groups[id];
            _groups.Remove(id);

            var remained = _groups.Where(kvp => kvp.Value == temp)
                .Select(kvp => kvp.Key)
                .Count();

            if (remained == 0)
            {
                int playlistId = int.Parse(temp);
                var deleted = await _context.SharePlay.FirstOrDefaultAsync(sp => sp.PlaylistId == playlistId);
                _context.SharePlay.Remove(deleted);
                await _context.SaveChangesAsync();
            }

            var master = await _context.SharePlay.FirstOrDefaultAsync(sp => sp.MasterId == id);

            if (master != null)
            {
                _context.SharePlay.Remove(master);
                await _context.SaveChangesAsync();
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendSynchronization(SharePlayDataDTO syncData)
        {
            await Clients.Groups(syncData.PlaylistId.ToString()).ResendSynchronization(syncData);
        }

        public async Task Connect(SharePlayDTO dto)
        {
            await AddToGroup(dto.PlaylistId.ToString());
            _groups.TryAdd(int.Parse(Context.User.FindFirst(Claims.Id).Value), dto.PlaylistId.ToString());
        }

        private async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        private async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }
    }
}

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
        private readonly SharePlayService _sharePlayService;
        private readonly static Dictionary<int, string> _groups = new Dictionary<int, string>();

        public SharePlayHub(SharePlayService sharePlayService)
        {
            _sharePlayService = sharePlayService;
        }

        public override async Task OnConnectedAsync()
        {
            await ClearDbRecodsAsync();

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            int userId = int.Parse(Context.User.FindFirst(Claims.Id).Value);

            await RemoveFromGroup(_groups[userId]);

            string temp = _groups[userId];
            _groups.Remove(userId);

            var remained = _groups.Where(kvp => kvp.Value == temp)
                .Select(kvp => kvp.Key)
                .Count();

            if (remained == 0)
            {
                int playlistId = int.Parse(temp);
                await _sharePlayService.RemoveRecordAsync(playlistId);
            }

            await _sharePlayService.DeleteRecordIfMasterDisconnectedAsync(userId);

            await ClearDbRecodsAsync();

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendSynchronization(SharePlayDataDTO syncData)
        {
            int userId = int.Parse(Context.User.FindFirst(Claims.Id).Value);

            if (_groups.ContainsKey(userId))
            {
                await Clients.Groups(syncData.PlaylistId.ToString()).ResendSynchronization(syncData);
            }
        }

        public async Task Disconnect(SharePlayDTO dto)
        {
            int userId = int.Parse(Context.User.FindFirst(Claims.Id).Value);

            if (_groups.ContainsKey(userId))
            {
                await RemoveFromGroup(dto.PlaylistId.ToString());
                _groups.Remove(userId);
            }

            await _sharePlayService.DeleteRecordIfMasterDisconnectedAsync(userId);
        }

        public async Task Connect(SharePlayDTO dto)
        {
            int userId = int.Parse(Context.User.FindFirst(Claims.Id).Value);

            if (!_groups.ContainsKey(userId))
            {
                await AddToGroup(dto.PlaylistId.ToString());
                _groups.TryAdd(userId, dto.PlaylistId.ToString());
            }
            
            if (userId == dto.MasterId && _groups.ContainsKey(userId))
            {
                await _sharePlayService.NotifyGroup(dto, userId);
            }
        }

        private async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        private async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        private async Task ClearDbRecodsAsync()
        {
            if (_groups.Count == 0)
            {
                await _sharePlayService.ClearAllRecordsAsync();
            }
        }
    }
}

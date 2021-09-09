using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Hubs.Interfaces;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;

namespace Perflow.Hubs.Implementations
{
    [Authorize(Policy = Policies.IsUser)]
    public class SynchronizationHub : Hub<ISynchronizationHub>
    {
        private readonly ContentSynchronizationService _syncService;

        public SynchronizationHub(ContentSynchronizationService syncService)
        {
            _syncService = syncService;
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User == null)
            {
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, Context.UserIdentifier!);

            var userId = Context.User.GetId();
            var syncData = await _syncService.GetContentSyncAsync(userId);

            await Clients.Caller.ReceiveSynchronization(syncData);

            await base.OnConnectedAsync();
        }

        public async Task SendSynchronization(ContentSyncWriteDTO syncData)
        {
            if (Context.User == null)
            {
                return;
            }

            var userId = Context.User.GetId();

            await _syncService.AddContentSyncAsync(syncData, userId);

            await Clients.OthersInGroup(Context.UserIdentifier!)
                .ReceiveSynchronization(new()
                {
                    SongId = syncData.SongId,
                    Time = syncData.Time
                });
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (Context.User != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, Context.UserIdentifier!);
            }
            
            await base.OnDisconnectedAsync(exception);
        }
    }
}

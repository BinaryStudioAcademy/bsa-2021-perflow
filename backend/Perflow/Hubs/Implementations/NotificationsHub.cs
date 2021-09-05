using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Perflow.Common.DTO.Notifications;
using Perflow.Hubs.Interfaces;
using Shared.Auth.Constants;
using System;
using System.Threading.Tasks;

namespace Perflow.Hubs.Implementations
{
    [Authorize(Policy = Policies.IsUser)]
    public class NotificationsHub : Hub<INotificationsHub>
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendNotification(new NotificationReadDTO { Description = "OnConnectedAsync" });
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendNotification(new NotificationReadDTO { Description = "OnDisconnectedAsync" });
            await base.OnDisconnectedAsync(exception);
        }
    }
}

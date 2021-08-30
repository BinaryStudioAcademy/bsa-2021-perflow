using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Perflow.Hubs.Interfaces;
using Shared.Auth.Constants;

namespace Perflow.Hubs.Implementations
{
    [Authorize(Policy = Policies.IsUser)]
    public class NotificationsHub : Hub<INotificationsHub>
    {
    }
}

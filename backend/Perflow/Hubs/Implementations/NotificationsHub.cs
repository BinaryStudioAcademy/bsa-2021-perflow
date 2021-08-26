using Microsoft.AspNetCore.SignalR;
using Perflow.Hubs.Interfaces;
using System.Threading.Tasks;

namespace Perflow.Hubs.Implementations
{
    public class NotificationsHub : Hub<INotificationsHub>
    {
    }
}

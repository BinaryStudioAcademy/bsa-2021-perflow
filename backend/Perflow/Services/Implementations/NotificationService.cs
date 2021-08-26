using Microsoft.AspNetCore.SignalR;
using Perflow.Hubs.Implementations;
using Perflow.Hubs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class NotificationService
    {
        private readonly IHubContext<NotificationsHub, INotificationsHub> _hubContext;

        public NotificationService(IHubContext<NotificationsHub, INotificationsHub> hubContext)
        {
            _hubContext = hubContext;
        }
    }
}

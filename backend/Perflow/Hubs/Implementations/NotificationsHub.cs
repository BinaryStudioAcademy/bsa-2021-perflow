using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Hubs.Interfaces;
using Shared.Auth.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Hubs.Implementations
{
    [Authorize(Policy = Policies.IsUser)]
    public class NotificationsHub : Hub<INotificationsHub>
    {
        private readonly PerflowContext _context;

        public NotificationsHub(PerflowContext context)
        {
            _context = context;
        }

        public async Task AddToGroup(ArtistNameDTO artist)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"{artist.Id}{artist.UserName}");
        }

        public async Task RemoveFromGroup(ArtistNameDTO artist)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"{artist.Id}{artist.UserName}");
        }

        public override async Task OnConnectedAsync()
        {
            if (!int.TryParse(Context.User.FindFirst(Claims.Id).Value, out int id))
            {
                throw new ArgumentException("Incorrect id");
            }
            var subscriptions = await GetUserSubscriptionsAsync(id);

            subscriptions.ForEach(async s => await Groups.AddToGroupAsync(Context.ConnectionId, s));

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (!int.TryParse(Context.User.FindFirst(Claims.Id).Value, out int id))
            {
                throw new ArgumentException("Incorrect id");
            }
            var subscriptions = await GetUserSubscriptionsAsync(id);

            subscriptions.ForEach(async s => await Groups.RemoveFromGroupAsync(Context.ConnectionId, s));

            await base.OnDisconnectedAsync(exception);
        }

        private async Task<List<string>> GetUserSubscriptionsAsync(int id)
        {
            var artistSubscriptions = await _context.ArtistReactions
                    .Where(ar => ar.UserId == id)
                    .Select(ar => $"{ar.ArtistId}{ar.Artist.UserName}")
                    .ToListAsync();

            var groupSubscriptions = await _context.GroupReactions
                    .Where(gr => gr.UserId == id)
                    .Select(gr => $"{gr.GroupId}{gr.Group.Name}")
                    .ToListAsync();

            return artistSubscriptions.Concat(groupSubscriptions).ToList();
        }
    }
}

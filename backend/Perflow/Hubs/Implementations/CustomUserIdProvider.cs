using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using Shared.Auth.Constants;

namespace Perflow.Hubs.Implementations
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirstValue(Claims.Id);
        }
    }
}

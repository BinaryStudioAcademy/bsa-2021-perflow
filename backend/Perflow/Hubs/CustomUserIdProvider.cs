using Microsoft.AspNetCore.SignalR;
using Shared.Auth.Constants;

namespace Perflow.Hubs
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(Claims.Id).Value;
        }
    }
}

using System;
using FirebaseAdmin.Auth;
using Shared.Auth.Constants;

namespace Shared.Auth.Extensions
{
    public static class FirebaseTokenExtensions
    {
        public static bool ContainsId(this FirebaseToken token)
        {
            return token.Claims.ContainsKey(Claims.Id);
        }

        public static int GetId(this FirebaseToken token)
        {
            var id = (long)token.Claims[Claims.Id];
            return Convert.ToInt32(id);
        }

        public static bool ContainsRole(this FirebaseToken token)
        {
            return token.Claims.ContainsKey(Claims.Role);
        }

        public static UserRole GetRole(this FirebaseToken token)
        {
            var role = (long)token.Claims[Claims.Role];
            return (UserRole)Convert.ToInt32(role);
        }
    }
}

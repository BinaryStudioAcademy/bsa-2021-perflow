using System.Linq;
using System.Security.Claims;
using Shared.Auth.Constants;

namespace Shared.Auth.Extensions
{
    public static class ClaimsExtensions
    {
        public static int GetId(this ClaimsPrincipal user)
        {
            var idString = user.Claims.First(claim => claim.Type == Claims.Id).Value;
            return int.Parse(idString);
        }

        public static UserRole GetRole(this ClaimsPrincipal user)
        {
            var roleString = user.Claims.First(claim => claim.Type == ClaimTypes.Role).Value;
            return (UserRole)int.Parse(roleString);
        }
    }
}

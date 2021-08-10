using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Shared.Auth.Models
{
    public class RoleRequirement : IAuthorizationRequirement
    {
        public IList<UserRole> Roles { get; }

        public RoleRequirement(UserRole role)
        {
            Roles = new List<UserRole> { role };
        }

        public RoleRequirement(IList<UserRole> roles)
        {
            Roles = roles;
        }
    }
}

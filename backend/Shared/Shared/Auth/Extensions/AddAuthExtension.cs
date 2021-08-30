using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shared.Auth.Constants;
using Shared.Auth.Models;
using Shared.Auth.Services;

namespace Shared.Auth.Extensions
{
    public static class AddAuthExtension
    {
        public static void AddAuth(this IServiceCollection services, string firebaseProjectId)
        {
            services.AddSingleton<IAuthorizationHandler, RoleRequirementHandler>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = $"https://securetoken.google.com/{firebaseProjectId}";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = $"https://securetoken.google.com/{firebaseProjectId}",
                        ValidateAudience = true,
                        ValidAudience = firebaseProjectId,
                        ValidateLifetime = true
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = async context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/notifications"))
                            {
                                context.Token = accessToken;
                            }
                            await Task.CompletedTask;
                        },

                    };
                });

            services.AddAuthorization(options =>
            {
                options.DefaultPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .RequireClaim(Claims.Id)
                    .RequireClaim(ClaimTypes.Role)
                    .Build();

                options.AddPolicy(Policies.IsUser,
                    policy => policy.AddRequirements(
                        new RoleRequirement(new List<UserRole>
                        {
                            UserRole.User,
                            UserRole.Artist,
                            UserRole.Moderator
                        })));
                options.AddPolicy(Policies.IsArtist,
                    policy => policy.AddRequirements(
                        new RoleRequirement(new List<UserRole>
                        {
                            UserRole.Artist,
                            UserRole.Moderator
                        })));
                options.AddPolicy(Policies.IsModerator,
                    policy => policy.AddRequirements(
                        new RoleRequirement(UserRole.Moderator)));
            });
        }
    }
}

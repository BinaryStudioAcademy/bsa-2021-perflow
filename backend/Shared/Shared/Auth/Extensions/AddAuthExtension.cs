﻿using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shared.Auth.Constants;
using Shared.Auth.Models;
using Shared.Auth.Services;

namespace Shared.Auth.Extensions
{
    public static class AddAuthExtension
    {
        public static void AddAuth(this IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationHandler, RoleRequirementHandler>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = "https://securetoken.google.com/perflow-bsa";
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = "https://securetoken.google.com/perflow-bsa",
                        ValidateAudience = true,
                        ValidAudience = "perflow-bsa",
                        ValidateLifetime = true
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

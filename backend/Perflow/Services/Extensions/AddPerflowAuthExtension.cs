using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shared.Auth.Extensions;

namespace Perflow.Services.Extensions
{
    public static class AddPerflowAuthExtension
    {
        public static IServiceCollection AddPerflowAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuth(
                configuration["GOOGLE_CREDENTIALS:project_id"],
                options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = AuthOnMessageReceived
                    };
                }
            );

            return services;
        }

        private static async Task AuthOnMessageReceived(MessageReceivedContext context)
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && IsSignalRHubPath(path))
            {
                context.Token = accessToken;
            }
            await Task.CompletedTask;
        }

        private static bool IsSignalRHubPath(PathString path)
        {
            return path.StartsWithSegments("/notifications") || path.StartsWithSegments("/content-sync");
        }
    }
}

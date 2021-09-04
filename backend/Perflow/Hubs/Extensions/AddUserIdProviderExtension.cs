using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SignalR;
using Perflow.Hubs.Implementations;

namespace Perflow.Hubs.Extensions
{
    public static class AddUserIdProviderExtension
    {
        public static void AddUserIdProvider(this IServiceCollection services)
        {
            services.AddSingleton<IUserIdProvider, CustomUserIdProvider>();
        }
    }
}

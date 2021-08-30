using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.SignalR;

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

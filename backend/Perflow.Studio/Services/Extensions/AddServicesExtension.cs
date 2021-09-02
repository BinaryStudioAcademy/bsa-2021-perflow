using System.Data;
using Microsoft.Extensions.DependencyInjection;
using Perflow.Studio.DataAccess.Implementations;
using Perflow.Studio.Services.Implementations;
using Perflow.Studio.Services.Interfaces;

namespace Perflow.Studio.Services.Extensions
{
    public static class AddServicesExtension
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddSingleton<IDateProvider, DateProvider>();

            services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

            services.AddSingleton<ISongsUploadService, SongsUploadService>();

            services.AddScoped<ISongFilesService, SongFilesService>();

            services.AddScoped<IDbConnection>(provider => provider
                .GetRequiredService<IDbConnectionFactory>()
                .GetConnection());
        }
    }
}

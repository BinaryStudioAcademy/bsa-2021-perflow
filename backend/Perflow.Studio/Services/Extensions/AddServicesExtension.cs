using Microsoft.Extensions.DependencyInjection;
using Perflow.Studio.DataAccess.Extensions;
using Perflow.Studio.DataAccess.Implementations;
using Perflow.Studio.DataAccess.Repositories;
using Perflow.Studio.Domain.Entities;
using Perflow.Studio.Services.Implementations;
using Perflow.Studio.Services.Interfaces;
using Perflow.Studio.Services.Interfaces.Repositories;

namespace Perflow.Studio.Services.Extensions
{
    public static class AddServicesExtension
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            services.AddSingleton<IDateProvider, DateProvider>();

            services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

            services.AddRepository<Song, ISongsRepository, SongsRepository>();
        }
    }
}

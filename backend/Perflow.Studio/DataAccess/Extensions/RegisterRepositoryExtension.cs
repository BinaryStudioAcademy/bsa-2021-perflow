using Microsoft.Extensions.DependencyInjection;
using Perflow.Studio.Domain.Entities;
using Perflow.Studio.Services.Interfaces.Repositories;

namespace Perflow.Studio.DataAccess.Extensions
{
    public static class RegisterRepositoryExtension
    {
        public static void AddRepository<TEntity, TInterface, TImplementation>(this IServiceCollection services)
            where TEntity : class, IEntity
            where TInterface : class, IRepository<TEntity>
            where TImplementation : class, TInterface
        {
            services.AddTransient<IReadRepository<TEntity>>(provider => provider.GetService<TInterface>()!);
            services.AddTransient<IWriteRepository<TEntity>>(provider => provider.GetService<TInterface>()!);
            services.AddTransient<IRepository<TEntity>>(provider => provider.GetService<TInterface>()!);
            services.AddTransient<TInterface, TImplementation>();
        }
    }
}

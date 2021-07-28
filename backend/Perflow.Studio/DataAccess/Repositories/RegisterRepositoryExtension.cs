using Microsoft.Extensions.DependencyInjection;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.DataAccess.Repositories
{
    public static class RegisterRepositoryExtension
    {
        public static void AddGenericRepository<TEntity>(this IServiceCollection services)
            where TEntity : class, IEntity
        {
            services.AddRepository<TEntity, Repository<TEntity>>();
        }

        public static void AddRepository<TEntity, TImplementation>(this IServiceCollection services)
            where TEntity : class, IEntity
            where TImplementation : class, IRepository<TEntity>
        {
            services.AddTransient<IReadRepository<TEntity>>(provider => provider.GetService<IRepository<TEntity>>()!);
            services.AddTransient<IWriteRepository<TEntity>>(provider => provider.GetService<IRepository<TEntity>>()!);
            services.AddTransient<IRepository<TEntity>, TImplementation>();
        }
    }
}

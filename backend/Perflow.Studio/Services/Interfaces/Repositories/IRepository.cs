using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Services.Interfaces.Repositories
{
    public interface IRepository<TEntity> : IReadRepository<TEntity>, IWriteRepository<TEntity>
        where TEntity : class, IEntity
    {

    }
}

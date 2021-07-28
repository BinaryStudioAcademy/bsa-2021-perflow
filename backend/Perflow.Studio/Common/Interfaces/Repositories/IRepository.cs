using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Common.Interfaces.Repositories
{
    public interface IRepository<TEntity> : IReadRepository<TEntity>, IWriteRepository<TEntity>
        where TEntity : class, IEntity
    {

    }
}

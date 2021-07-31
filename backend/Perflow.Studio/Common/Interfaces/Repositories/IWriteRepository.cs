using System;
using System.Threading.Tasks;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Common.Interfaces.Repositories
{
    public interface IWriteRepository<TEntity> : IDisposable where TEntity : class, IEntity
    {
        public Task<TEntity> AddAsync(TEntity entity);

        public Task DeleteAsync(TEntity entity);

        public Task UpdateAsync(TEntity entity);
    }
}

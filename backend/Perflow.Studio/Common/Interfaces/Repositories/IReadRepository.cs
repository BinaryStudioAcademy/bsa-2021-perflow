using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Common.Interfaces.Repositories
{
    public interface IReadRepository<TEntity> : IDisposable where TEntity : class, IEntity
    {
        public Task<TEntity?> ReadAsync(int id);

        public Task<IEnumerable<TEntity>> ReadAllAsync();
    }
}

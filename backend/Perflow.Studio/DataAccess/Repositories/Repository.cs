using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.DataAccess.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        public Task<TEntity?> ReadAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<TEntity>> ReadAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<TEntity> AddAsync(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteAsync(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateAsync(TEntity entity)
        {
            throw new System.NotImplementedException();
        }
    }
}

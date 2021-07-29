using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Perflow.Studio.Common.Interfaces;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.DataAccess.Repositories
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        private readonly string _tableName;
        private readonly IDbConnection _connection;

        protected IDbConnection Connection => _connection;

        protected RepositoryBase(string tableName, IDbConnectionFactory connectionFactory)
        {
            _tableName = tableName;
            _connection = connectionFactory.GetConnection();
        }

        public virtual async Task<TEntity?> ReadAsync(int id)
        {
            var sql = $"SELECT * From {_tableName} WHERE Id = @Id";

            return await _connection.QueryFirstOrDefaultAsync<TEntity>(sql, new { id });
        }

        public virtual Task<IEnumerable<TEntity>> ReadAllAsync()
        {
            var sql = $"SELECT * FROM {_tableName}";
            return _connection.QueryAsync<TEntity>(sql);
        }

        public abstract Task<TEntity> AddAsync(TEntity entity);

        public abstract Task UpdateAsync(TEntity entity);

        public virtual async Task DeleteAsync(TEntity entity)
        {
            var sql = $"DELETE FROM {_tableName} WHERE Id = @Id";
            await _connection.ExecuteAsync(sql, new { entity.Id });
        }

        public void Dispose()
        {
            _connection.Dispose();
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface IService<TEntity> where TEntity : class
    {
        Task<ICollection<TEntity>> GetEntitiesAsync();
    
        Task<TEntity> GetEntityAsync(int id);
    
        Task<TEntity> AddEntityAsync(TEntity entity);
    
        Task<TEntity> UpdateEntityAsync(TEntity entity);
    
        Task<int> DeleteEntityAsync(int entityId);
    }
}

using System.Data;

namespace Perflow.Studio.Services.Interfaces
{
    public interface IDbConnectionFactory
    {
        public IDbConnection GetConnection();
    }
}

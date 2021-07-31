using System.Data;

namespace Perflow.Studio.Common.Interfaces
{
    public interface IDbConnectionFactory
    {
        public IDbConnection GetConnection();
    }
}

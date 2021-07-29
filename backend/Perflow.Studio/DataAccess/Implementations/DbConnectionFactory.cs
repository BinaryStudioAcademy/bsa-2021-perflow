using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Perflow.Studio.Common.Interfaces;

namespace Perflow.Studio.DataAccess.Implementations
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private readonly string _connectionString;

        public DbConnectionFactory(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("PerflowDbConnection");
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}

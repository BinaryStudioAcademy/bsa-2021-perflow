using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain.Repositories
{
    public static class RepositoryExtension
    {
        private readonly static string _connectionString = "PerflowDbConnection";
        public static async Task<int> AddSqlConnection<T>(IConfiguration configuration, string sql, T entity)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }

        public static async Task<int> DeleteSqlConnection(IConfiguration configuration, string sql, int id)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }

        public static async Task<IReadOnlyList<T>> GetAllSqlConnection<T>(IConfiguration configuration, string sql)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<T>(sql);
                return result.ToList();
            }
        }

        public static async Task<T> GetByIdSqlConnection<T>(IConfiguration configuration, string sql, int id)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<T>(sql, new { Id = id });
                return result;
            }
        }

        public static async Task<int> UpdateSqlConnection<T>(IConfiguration configuration, string sql, T entity)
        {
            using (var connection = new SqlConnection(configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Perflow.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "PerflowDbConnection";
        public GroupRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(Group entity)
        {
            entity.CreatedAt = DateTime.Now;
            var sql = "Insert into Groups (Name, CreatedAt) VALUES (@Name, @CreatedAt)";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Groups WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<Group>> GetAllAsync()
        {
            var sql = "SELECT * FROM Groups";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<Group>(sql);
                return result.ToList();
            }
        }
        public async Task<Group> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Groups WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<Group>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(Group entity)
        {
            var sql = "UPDATE Groups SET Name = @Name, CreatedAt = @CreatedAt  WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

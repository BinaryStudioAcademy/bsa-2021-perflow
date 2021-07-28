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
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "PerflowDbConnection";
        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(User entity)
        {
            entity.CreatedAt = DateTime.Now;
            var sql = "Insert into Users (UserName, IconURL, Description, Email, Country, Birthday, Gender, Password, Salt, GroupId, CreatedAt) VALUES (@UserName, @IconURL, @Description, @Email, @Country, @Birthday, @Gender, @Password, @Salt, @GroupId, @CreatedAt)";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Users WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            var sql = "SELECT * FROM Users";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<User>(sql);
                return result.ToList();
            }
        }
        public async Task<User> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Users WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<User>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(User entity)
        {
            var sql = "UPDATE Users SET UserName = @UserName, IconURL = @IconURL, Description = @Description, Email = @Email, Country = @Country, Birthday = @Birthday, Gender = @Gender, Password = @Password, Salt = @Salt, GroupId = @GroupId, CreatedAt = @CreatedAt  WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

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
    public class SongRepository : ISongRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "PerflowDbConnection";
        public SongRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(Song entity)
        {
            entity.CreatedAt = DateTime.Now;
            var sql = "Insert into Songs (Name, AuthorType, ArtistId, GroupId, IconURL, Duration, HasCensorship, CreatedAt) VALUES (@Name, @AuthorType, @ArtistId, @GroupId, @IconURL, @Duration, @HasCensorship, @CreatedAt)";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Songs WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<Song>> GetAllAsync()
        {
            var sql = "SELECT * FROM Songs";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<Song>(sql);
                return result.ToList();
            }
        }
        public async Task<Song> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Songs WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<Song>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(Song entity)
        {
            var sql = "UPDATE Songs SET Name = @Name, AuthorType = @AuthorType, ArtistId = @ArtistId, GroupId = @GroupId, IconURL = @IconURL, Duration = @Duration, HasCensorship = @HasCensorship, CreatedAt = @CreatedAt  WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

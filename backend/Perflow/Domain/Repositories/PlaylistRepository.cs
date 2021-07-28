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
    public class PlaylistRepository : IPlaylistRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "PerflowDbConnection";
        public PlaylistRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(Playlist entity)
        {
            entity.CreatedAt = DateTime.Now;
            var sql = "Insert into Playlists (Name, Description, IconURL, AuthorId, AccessType, CreatedAt) VALUES (@Name, @Description, @IconURL, @AuthorId, @AccessType, @CreatedAt)";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Playlists WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<Playlist>> GetAllAsync()
        {
            var sql = "SELECT * FROM Playlists";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<Playlist>(sql);
                return result.ToList();
            }
        }
        public async Task<Playlist> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Playlists WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<Playlist>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(Playlist entity)
        {
            var sql = "UPDATE Playlists SET Name = @Name, Description = @Description, IconURL = @IconURL, AuthorId = @AuthorId, AccessType = @AccessType, CreatedAt = @CreatedAt  WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

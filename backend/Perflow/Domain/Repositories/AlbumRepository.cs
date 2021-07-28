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
    public class AlbumRepository : IAlbumRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString = "PerflowDbConnection";
        public AlbumRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<int> AddAsync(Album entity)
        {
            entity.CreatedAt = DateTime.Now;
            var sql = "Insert into Albums (Name, ReleaseYear, IconURL, Description, Region, isPublished, AuthorType, AuthorId, GroupId, isSingle, CreatedAt) VALUES (@Name, @ReleaseYear, @IconURL, @Description, @Region, @isPublished, @AuthorType, @AuthorId, @GroupId, @isSingle, @CreatedAt)";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
        public async Task<int> DeleteAsync(int id)
        {
            var sql = "DELETE FROM Albums WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, new { Id = id });
                return result;
            }
        }
        public async Task<IReadOnlyList<Album>> GetAllAsync()
        {
            var sql = "SELECT * FROM Albums";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<Album>(sql);
                return result.ToList();
            }
        }
        public async Task<Album> GetByIdAsync(int id)
        {
            var sql = "SELECT * FROM Albums WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.QuerySingleOrDefaultAsync<Album>(sql, new { Id = id });
                return result;
            }
        }
        public async Task<int> UpdateAsync(Album entity)
        {
            var sql = "UPDATE Albums SET Name = @Name, ReleaseYear = @ReleaseYear, IconURL = @IconURL, Description = @Description, Region = @Region, isPublished = @isPublished, AuthorType = @AuthorType, AuthorId = @AuthorId, GroupId = @GroupId, isSingle = @isSingle, CreatedAt = @CreatedAt  WHERE Id = @Id";
            using (var connection = new SqlConnection(_configuration.GetConnectionString(_connectionString)))
            {
                connection.Open();
                var result = await connection.ExecuteAsync(sql, entity);
                return result;
            }
        }
    }
}

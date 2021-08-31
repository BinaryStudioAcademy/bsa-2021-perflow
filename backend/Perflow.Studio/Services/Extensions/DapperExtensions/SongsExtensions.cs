using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Services.Extensions.DapperExtensions
{
    public static class SongsExtensions
    {
        private const string SongsTableName = "Songs";

        public static Task<bool> SongExistsAsync(this IDbConnection connection, int songId, IDbTransaction? transaction = null)
        {
            var sql = $"SELECT COUNT(1) FROM {SongsTableName} WHERE Id=@Id";
            return connection.ExecuteScalarAsync<bool>(sql, new { Id = songId }, transaction);
        }

        public static async Task<Song> SongAddAsync(this IDbConnection connection, Song song)
        {
            const string sql =
                @"INSERT INTO Songs (
                   Name,
                   AuthorType,
                   ArtistId,
                   GroupId,
                   AlbumId,
                   Duration,
                   HasCensorship,
                   SourceBlobId,
                   VeryHighBlobId,
                   HighBlobId,
                   MediumBlobId,
                   LowBlobId,
                   [Order],
                   CreatedAt)
                VALUES(
                    @Name,
                    @AuthorType,
                    @ArtistId,
                    @GroupId,
                    @AlbumId,
                    @Duration,
                    @HasCensorship,
                    @SourceBlobId,
                    @VeryHighBlobId,
                    @HighBlobId,
                    @MediumBlobId,
                    @LowBlobId,
                    @Order,
                    @CreatedAt);
                SELECT CAST(SCOPE_IDENTITY() as int)";

            var id = await connection.QueryFirstAsync<int>(sql, song);

            song.Id = id;
            return song;
        }

        public static async Task SongDeleteAsync(this IDbConnection connection, int songId)
        {
            var sql = $"DELETE FROM {SongsTableName} WHERE Id = @Id";
            await connection.ExecuteAsync(sql, new { Id = songId });
        }
    }
}

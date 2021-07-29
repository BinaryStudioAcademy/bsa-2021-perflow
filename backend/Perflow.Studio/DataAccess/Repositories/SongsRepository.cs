using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Common.Interfaces;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.DataAccess.Repositories
{
    public class SongsRepository : RepositoryBase<Song>, ISongsRepository
    {
        public SongsRepository(IDbConnectionFactory connectionFactory)
            : base("Songs", connectionFactory) { }

        public async Task<SongReadDTO?> ReadAsDTOAsync(int id)
        {
            var sql = @"SELECT Id, Name, Duration, IconURL, HasCensorship, CreatedAt, AuthorType FROM Songs
                        WHERE Id = @Id";
            var data = new {id};
            var songDto = await Connection.QueryFirstOrDefaultAsync<SongReadDTO>(sql, data);
            return songDto;
        }

        public Task<IEnumerable<SongReadDTO>> ReadAllAsDTOAsync()
        {
            var sql = @"SELECT Id, Name, Duration, IconURL, HasCensorship, CreatedAt, AuthorType FROM Songs";
            return Connection.QueryAsync<SongReadDTO>(sql);
        }

        public override async Task<Song> AddAsync(Song song)
        {
            var sql = @"INSERT INTO Songs (Name, Duration, IconURL, HasCensorship, CreatedAt, AuthorType)
                            VALUES(@Name, @Duration, @IconURL, @HasCensorship, @CreatedAt, @AuthorType);
                            SELECT CAST(SCOPE_IDENTITY() as int)";
            var data = new
            {
                song.Name,
                song.Duration,
                song.IconURL,
                song.HasCensorship,
                song.CreatedAt,
                song.AuthorType
            };
            var id = await Connection.QueryFirstAsync<int>(sql, data);

            song.Id = id;
            return song;
        }

        public override async Task UpdateAsync(Song song)
        {
            var sql = @"UPDATE Songs 
                        SET
                            Name = @Name,
                            Duration = @Duration,
                            IconURL = @IconURL,
                            HasCensorship = @HasCensorship,
                            AuthorType = @AuthorType
                        WHERE Id = @Id";
            var data = new
            {
                song.Name,
                song.Duration,
                song.IconURL,
                song.HasCensorship,
                song.AuthorType,
                song.Id
            };
            await Connection.ExecuteAsync(sql, data);
        }
    }
}

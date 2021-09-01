using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Services.Extensions.DapperExtensions;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class SetSongCensorshipHandler : IRequestHandler<SetSongCensorshipCommand, OneOf<Success, NotFound>>
    {
        private readonly IDbConnection _connection;

        public SetSongCensorshipHandler(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<OneOf<Success, NotFound>> Handle(SetSongCensorshipCommand request, CancellationToken cancellationToken)
        {
            var songExists = await _connection.SongExistsAsync(request.Id);

            if (!songExists)
            {
                return new NotFound();
            }

            const string sql =
                @"UPDATE Songs SET
                    HasCensorship = @Value
                WHERE Id = @Id";

            await _connection.ExecuteAsync(sql, request);
            return new Success();
        }
    }
}

using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using MediatR;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Services.Extensions.DapperExtensions;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class SetSongOrderHandler : IRequestHandler<SetSongOrderCommand>
    {
        private readonly IDbConnection _connection;

        public SetSongOrderHandler(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<Unit> Handle(SetSongOrderCommand request, CancellationToken cancellationToken)
        {
            _connection.Open();
            using var transaction = _connection.BeginTransaction();

            foreach (var order in request.Orders)
            {
                await TrySetOrder(order.Id, order.Order, transaction);
            }

            transaction.Commit();
            _connection.Close();

            return Unit.Value;
        }

        private async Task TrySetOrder(int songId, int order, IDbTransaction transaction)
        {
            var songExists = await _connection.SongExistsAsync(songId, transaction);

            if (!songExists)
            {
                return;
            }

            const string sql =
                @"UPDATE Songs SET
                    [Order] = @Value
                WHERE Id = @Id";

            var data = new
            {
                Value = order,
                Id = songId
            };

            await _connection.ExecuteAsync(sql, data, transaction);
        }
    }
}

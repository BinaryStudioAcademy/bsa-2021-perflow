using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Constructor.Commands;
using Perflow.Studio.Services.Extensions.DapperExtensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Handlers
{
    public class DeleteContainerHandler : IRequestHandler<DeleteContainerCommand, OneOf<Success, NotFound>>
    {
        private readonly IDbConnection _connection;

        public DeleteContainerHandler(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<OneOf<Success, NotFound>> Handle(DeleteContainerCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _connection.DeleteContainer(request.Id);
                return new Success();
            }
            catch
            {
                return new NotFound();
            }
        }
    }
}

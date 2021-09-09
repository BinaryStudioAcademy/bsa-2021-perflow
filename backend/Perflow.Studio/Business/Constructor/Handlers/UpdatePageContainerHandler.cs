using AutoMapper;
using MediatR;
using OneOf.Types;
using Perflow.Studio.Business.Constructor.Commands;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Domain.Entities;
using Perflow.Studio.Services.Extensions.DapperExtensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Handlers
{
    public class UpdatePageContainerHandler : IRequestHandler<UpdatePageContainerCommand, Success>
    {
        private readonly IDbConnection _connection;
        private readonly IMapper _mapper;

        public UpdatePageContainerHandler(IMapper mapper, IDbConnection connection)
        {
            _mapper = mapper;
            _connection = connection;
        }

        public async Task<Success> Handle(UpdatePageContainerCommand request, CancellationToken cancellationToken)
        {
            var pageContainer = _mapper.Map<PageContainerDTO, PageContainer>(request.Dto);
            await _connection.UpdateContainer(pageContainer);
            return new Success();
        }
    }
}

using AutoMapper;
using MediatR;
using OneOf;
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
    public class CreatePageContainerHandler : IRequestHandler<CreatePageContainerCommand, Success>
    {
        private readonly IDbConnection _connection;
        private readonly IMapper _mapper;

        public CreatePageContainerHandler(IMapper mapper, IDbConnection connection)
        {
            _mapper = mapper;
            _connection = connection;
        }

        public async Task<Success> Handle(CreatePageContainerCommand request, CancellationToken cancellationToken)
        {
            var pageContainer = _mapper.Map<PageContainerDTO, PageContainer>(request.Dto);
            await _connection.AddContainer(pageContainer);
            return new Success();
        }
    }
}

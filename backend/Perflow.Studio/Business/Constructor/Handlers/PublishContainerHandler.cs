using AutoMapper;
using MediatR;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Business.Constructor.Queries;
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
    public class PublishContainerHandler : IRequestHandler<PublishContainerQuery, PageContainerViewDTO>
    {
        private readonly IDbConnection _connection;
        private readonly IMapper _mapper;

        public PublishContainerHandler(IMapper mapper, IDbConnection connection)
        {
            _mapper = mapper;
            _connection = connection;
        }

        public async Task<PageContainerViewDTO> Handle(PublishContainerQuery request, CancellationToken cancellationToken)
        {
            var pageContainer = _mapper.Map<PageContainerViewDTO, PageContainer>(request.Dto);
            var result = await _connection.PublishContainer(pageContainer);
            return _mapper.Map<PageContainer, PageContainerViewDTO>(result);
        }
    }
}

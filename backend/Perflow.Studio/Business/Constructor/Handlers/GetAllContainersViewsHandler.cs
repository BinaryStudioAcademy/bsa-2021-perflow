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
    public class GetAllContainersViewsHandler : IRequestHandler<GetAllContainersViewsQuery, IEnumerable<PageContainerViewDTO>>
    {
        private readonly IDbConnection _connection;
        private readonly IMapper _mapper;

        public GetAllContainersViewsHandler(IMapper mapper, IDbConnection connection)
        {
            _mapper = mapper;
            _connection = connection;
        }

        public async Task<IEnumerable<PageContainerViewDTO>> Handle(GetAllContainersViewsQuery request, CancellationToken cancellationToken)
        {

            var pageContainers = await _connection.GetAllContainersViews();

            return _mapper.Map<IEnumerable<PageContainerViewDTO>>(pageContainers);
        }
    }
}

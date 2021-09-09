using MediatR;
using Perflow.Studio.Business.Constructor.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Queries
{
    public class PublishContainerQuery : IRequest<PageContainerViewDTO>
    {
        public PageContainerViewDTO Dto { get; }

        public PublishContainerQuery(PageContainerViewDTO dto)
        {
            Dto = dto;
        }
    }
}

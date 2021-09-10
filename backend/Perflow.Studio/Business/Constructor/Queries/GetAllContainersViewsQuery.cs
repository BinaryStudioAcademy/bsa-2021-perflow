using MediatR;
using Perflow.Studio.Business.Constructor.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Queries
{
    public class GetAllContainersViewsQuery : IRequest<IEnumerable<PageContainerViewDTO>>
    {
    }
}

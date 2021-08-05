using AutoMapper;
using Perflow.DataAccess.Context;

namespace Perflow.Services.Abstract
{
    public abstract class BaseService
    {
        private protected readonly PerflowContext context;
        private protected readonly IMapper mapper;

        protected BaseService(PerflowContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
    }
}

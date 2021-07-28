using AutoMapper;
using Perflow.DataAccess.Context;

namespace Perflow.Services.Abstract
{
    public abstract class BaseService
    {
        private protected readonly PerflowContext _context;
        private protected readonly IMapper _mapper;

        protected BaseService(PerflowContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}

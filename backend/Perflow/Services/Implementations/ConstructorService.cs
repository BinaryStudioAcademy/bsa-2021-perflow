using AutoMapper;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ConstructorService : BaseService
    {
        public ConstructorService(PerflowContext context, IMapper mapper)
            : base(context, mapper)
        {

        }
    }
}

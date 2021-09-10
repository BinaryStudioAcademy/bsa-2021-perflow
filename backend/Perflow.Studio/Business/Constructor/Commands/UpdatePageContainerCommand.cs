using MediatR;
using OneOf.Types;
using Perflow.Studio.Business.Constructor.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Commands
{
    public class UpdatePageContainerCommand: IRequest<Success>
    {
        public PageContainerDTO Dto { get; }

        public UpdatePageContainerCommand(PageContainerDTO dto)
        {
            Dto = dto;
        }
    }
}

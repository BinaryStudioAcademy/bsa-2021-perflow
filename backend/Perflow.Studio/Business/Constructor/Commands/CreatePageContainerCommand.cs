using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Commands
{
    public class CreatePageContainerCommand : IRequest<Success>
    {
        public PageContainerDTO Dto { get; }


        public CreatePageContainerCommand(PageContainerDTO dto)
        {
            Dto = dto;
        }
    }
}

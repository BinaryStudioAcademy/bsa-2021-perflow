using MediatR;
using OneOf;
using OneOf.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.Commands
{
    public class DeleteContainerCommand : IRequest<OneOf<Success, NotFound>>
    {
        public int Id { get; }

        public DeleteContainerCommand(int id)
        {
            Id = id;
        }
    }
}

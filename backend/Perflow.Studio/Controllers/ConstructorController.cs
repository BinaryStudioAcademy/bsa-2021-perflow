using MediatR;
using Microsoft.AspNetCore.Mvc;
using Perflow.Studio.Business.Constructor.Commands;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Business.Constructor.Queries;
using Shared.Auth.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Controllers
{
    [ApiController]
    [Route("api/studio/Constructor")]
    public class ConstructorController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ConstructorController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult> AddContainer([FromBody] PageContainerDTO dto)
        {
            var request = new CreatePageContainerCommand(dto);
            await _mediator.Send(request);

            return Ok();
        }

        [HttpPost("publish")]
        public async Task<ActionResult<PageContainerViewDTO>> PublishContainer([FromBody] PageContainerViewDTO dto)
        {
            var request = new PublishContainerQuery(dto);
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateContainer([FromBody] PageContainerDTO dto)
        {
            var request = new UpdatePageContainerCommand(dto);
            await _mediator.Send(request);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PageContainerViewDTO>>> GetAllContainersViews()
        {
            var request = new GetAllContainersViewsQuery();
            var pageContainers = await _mediator.Send(request);

            return Ok(pageContainers);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContainer(int id)
        {
            var request = new DeleteContainerCommand(id);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Ok(),
                found => NotFound()
            );
        }
    }
}

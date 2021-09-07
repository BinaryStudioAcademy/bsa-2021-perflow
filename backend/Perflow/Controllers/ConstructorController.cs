using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Constructor;
using Perflow.Domain;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConstructorController : ControllerBase
    {
        private readonly ConstructorService _constructorService;
        private readonly IMapper _mapper;
        public ConstructorController(ConstructorService constructorService, IMapper mapper)
        {
            _constructorService = constructorService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult<ICollection<PageContainerViewDTO>>> GetAllContainersViews()
        {
            var result = await _constructorService.GetAllContainersViews();
            return Ok(result);
        }

        [HttpGet("published")]
        public async Task<ActionResult<PageContainerDTO>> GetPublishedContainer()
        {
            var result = await _constructorService.GetPublishedContainer(User.GetId());
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult<PageContainerDTO>> GetContainer(int id)
        {
            var result = await _constructorService.GetContainer(User.GetId(), containerId: id);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult<string>> CreateContainer([FromBody] PageContainerDTO pageContainer)
        {
            var json = JsonSerializer.Serialize(await _constructorService.CreatePageContainer(pageContainer), new JsonSerializerOptions()
            {
                WriteIndented = true,
                ReferenceHandler = ReferenceHandler.Preserve
            });

            return Ok(json);
        }

        [HttpPost]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult<string>> UpdateContainer([FromBody] PageContainerDTO pageContainer)
        {
            var json = JsonSerializer.Serialize(await _constructorService.UpdatePageContainer(pageContainer), new JsonSerializerOptions()
            {
                WriteIndented = true,
                ReferenceHandler = ReferenceHandler.Preserve
            });

            return Ok(json);
        }

        [HttpPost("publish")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult<PageContainerViewDTO>> PublishContainer([FromBody] PageContainerViewDTO pageContainer)
        {
            var result = await _constructorService.PublishContainer(pageContainer);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = Policies.IsModerator)]
        public async Task<ActionResult> DeleteContainer(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Container ID cannot be less than or equal to zero");

            return Ok(await _constructorService.DeleteContainer(id));
        }
    }
}

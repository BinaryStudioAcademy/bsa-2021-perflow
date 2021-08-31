using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Constructor;
using Perflow.Domain;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
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
    [Authorize(Policy = Policies.IsModerator)]
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
        public async Task<ActionResult<ICollection<PageContainerViewDTO>>> GetAllContainersViews()
        {
            var result = await _constructorService.GetAllContainersViews();
            return Ok(result);
        }

        [HttpGet("published")]
        public async Task<ActionResult<PageContainerDTO>> GetPublishedContainer()
        {
            var result = await _constructorService.GetPublishedContainer();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PageContainerDTO>> GetContainer(int id)
        {
            var result = await _constructorService.GetContainer(containerId: id);
            return Ok(result);
        }

        [HttpPut]
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
        public async Task<ActionResult<PageContainerViewDTO>> PublishContainer([FromBody] PageContainerViewDTO pageContainer)
        {
            var result = await _constructorService.PublishContainer(pageContainer);

            return Ok(result);
        }
    }
}

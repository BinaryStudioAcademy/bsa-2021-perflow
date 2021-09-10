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
    }
}

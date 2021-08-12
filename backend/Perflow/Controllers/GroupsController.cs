using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Groups;
using Perflow.Services.Implementations;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly GroupService _groupService;

        public GroupsController(GroupService groupService)
        {
            _groupService = groupService;
        }

        [HttpGet("artist/{id}")]
        public async Task<ActionResult<GroupForAlbumDTO>> GetGroupsByArtistAsync(int id)
        {
            return Ok(await _groupService.GetGroupsByArtistAsync(id));
        }
    }
}

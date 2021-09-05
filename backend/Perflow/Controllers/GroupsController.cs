using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Groups;
using Perflow.Services.Implementations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System.Collections.Generic;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
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

        [HttpGet]
        public async Task<ActionResult<ICollection<GroupForAlbumDTO>>> GetUserGroupsAsync()
        {
            return Ok(await _groupService.GetUserGroupsAsync(User.GetId()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupLikedDTO>> GetGroupAsync(int id)
        {
            return Ok(await _groupService.GetGroupAsync(id, User.GetId()));
        }

        [HttpPost]
        public async Task<ActionResult<GroupShortDTO>> CreateGroupAsync([FromForm] GroupWriteDTO group)
        {
            return Ok(await _groupService.CreateGroupAsync(group));
        }
    }
}

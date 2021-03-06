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

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupLikedDTO>> GetGroupAsync(int id)
        {
            return Ok(await _groupService.GetGroupAsync(id, User.GetId()));
        }

        [HttpGet("isMember/{id}")]
        public async Task<ActionResult<bool>> CheckGroupMemberAsync(int id)
        {
            return Ok(await _groupService.CheckGroupMemberAsync(id, User.GetId()));
        }

        [HttpDelete("{groupId}")]
        public async Task<ActionResult<int>> DeleteMemberAsync(int groupId)
        {
            return Ok(await _groupService.DeleteMemberAsync(groupId, User.GetId()));
        }

        [HttpPost]
        public async Task<ActionResult<GroupShortDTO>> CreateGroupAsync([FromForm] GroupWriteDTO group)
        {
            return Ok(await _groupService.CreateGroupAsync(group));
        }

        [HttpPut]
        public async Task<ActionResult<GroupFullDTO>> UpdateGroupAsync([FromForm] GroupEditDTO groupEditDTO)
        {
            return Ok(await _groupService.EditGroupAsync(groupEditDTO));
        }
    }
}

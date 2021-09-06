using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Reactions;
using Perflow.Common.DTO.Users;
using Perflow.Services.Implementations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupReactionsController : ControllerBase
    {
        private readonly GroupReactionService _groupReactionService;

        public GroupReactionsController(GroupReactionService groupReactionService)
        {
            _groupReactionService = groupReactionService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ICollection<ArtistReadDTO>>> Get(int id)
        {
            return Ok(await _groupReactionService.GetGroupsByUserId(id));
        }

        [HttpPost("like")]
        public async Task<ActionResult> AddGroupReactionAsync([FromBody] NewGroupReactionDTO reaction)
        {
            await _groupReactionService.AddGroupReactionAsync(reaction);

            return Ok();
        }

        [HttpPost("removeLike")]
        public async Task<ActionResult> RemoveGroupReactionAsync([FromBody] NewGroupReactionDTO reaction)
        {
            await _groupReactionService.RemoveGroupReactionAsync(reaction);

            return Ok();
        }
    }
}

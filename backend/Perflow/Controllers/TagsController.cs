using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Shared.Auth.Constants;
using Microsoft.AspNetCore.Authorization;
using Perflow.Services.Interfaces;
using Perflow.Common.DTO.Tags;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;

        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagReadDTO>>> GetAllTags()
        {
            return Ok(await _tagService.GetAllAsync());
        }

        [HttpPost]
        public async Task<ActionResult<TagReadDTO>> CreateTag([FromBody] TagWriteDTO tag)
        {
            return Ok(await _tagService.CreateTagAsync(tag));
        }

        [HttpPost("createTags")]
        public async Task<ActionResult<IEnumerable<TagReadDTO>>> CreateTagsAsync([FromBody] TagsCreateDTO tags)
        {
            return Ok(await _tagService.CreateTagsAsync(tags));
        }

        [HttpPost("addTagsToSong")]
        public async Task<ActionResult> AddTagsToSong([FromBody] SongTagsDTO tags)
        {
            await _tagService.AddTagsAsync(tags);

            return Ok();
        }
    }
}

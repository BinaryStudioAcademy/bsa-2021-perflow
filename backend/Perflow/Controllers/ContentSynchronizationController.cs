using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class ContentSynchronizationController : ControllerBase
    {
        private readonly ContentSynchronizationService _contentSynchronizationService;

        public ContentSynchronizationController(ContentSynchronizationService contentSynchronizationService)
        {
            _contentSynchronizationService = contentSynchronizationService;
        }

        [HttpPost]
        public async Task<ActionResult> AddContentSyncAsync([FromBody] ContentSyncWriteDTO contentDTO)
        {
            await _contentSynchronizationService.AddContentSyncAsync(contentDTO);

            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<ContentSyncReadDTO>> GetContentSyncAsync(int userId)
        {
            return Ok(await _contentSynchronizationService.GetContentSyncAsync(userId));
        }
    }
}

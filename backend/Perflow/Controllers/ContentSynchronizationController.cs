using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System.Threading.Tasks;
using Shared.Auth.Extensions;

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
            await _contentSynchronizationService.AddContentSyncAsync(contentDTO, User.GetId());

            return Ok();
        }

        [HttpGet("byUserId")]
        public async Task<ActionResult<ContentSyncReadDTO>> GetContentSyncAsync()
        {
            return Ok(await _contentSynchronizationService.GetContentSyncAsync(User.GetId()));
        }
    }
}

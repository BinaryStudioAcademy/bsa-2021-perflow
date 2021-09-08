using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Services.Implementations;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class SharePlayController : ControllerBase
    {
        private readonly SharePlayService _sharePlayService;
        public SharePlayController(SharePlayService sharePlayService)
        {
            _sharePlayService = sharePlayService;
        }

        [HttpGet("{playlistId}")]
        public async Task<ActionResult<bool>> GetSharePlayStateAsync(int playlistId)
        {
            return Ok(await _sharePlayService.GetSharePlayStateAsync(playlistId));
        }
    }
}

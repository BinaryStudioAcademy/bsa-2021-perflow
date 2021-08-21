using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.RecentlyPlayed;
using Perflow.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecentlyPlayedController : ControllerBase
    {
        RecentlyPlayedService _service;
        public RecentlyPlayedController(RecentlyPlayedService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddSong([FromBody] RecentlyPlayedDTO rpInfo)
        {
            await _service.AddSong(rpInfo);

            return Ok();
        }

        [HttpPost("add/{songId}")]
        public async Task<ActionResult> AddSongViaId(int songId, [FromBody] RPViaSongIdInfoDTO info)
        {
            await _service.AddSongViaId(songId, info);

            return Ok();
        }

        [HttpGet("get/all")]
        public async Task<ActionResult<IEnumerable<RecentlyPlayedDTO>>> GetAll([FromQuery] int userId)
        {
            return Ok(await _service.GetAll(userId));
        }

        [HttpGet("get/recent/{amount}")]
        public async Task<ActionResult<IEnumerable<RecentlyPlayedDTO>>> GetRecent([FromQuery] int userId, int amount)
        {
            return Ok(await _service.GetRecent(userId, amount));
        }

        [HttpGet("get/recent/songs/{amount}")]
        public async Task<ActionResult<IEnumerable<RecentlyPlayedDTO>>> GetRecentSongsAsync([FromQuery] int userId, int amount)
        {
            return Ok(await _service.GetRecentSongsAsync(userId, amount));
        }
    }
}

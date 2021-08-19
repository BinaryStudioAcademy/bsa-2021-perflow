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
    }
}

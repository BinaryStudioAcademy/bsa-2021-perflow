using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.Services.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistEditorsController : ControllerBase
    {
        private readonly PlaylistEditorsService _playlistEditorsService;

        public PlaylistEditorsController(PlaylistEditorsService playlistEditorsService)
        {
            _playlistEditorsService = playlistEditorsService;
        }

        [HttpPost("add")]
        public async Task<ActionResult> Add([FromBody] PlaylistEditorDTO pe)
        {
            await _playlistEditorsService.Add(pe)

            return Ok();
        }

        [HttpDelete("remove")]
        public async Task<ActionResult> Remove([FromBody] PlaylistEditorDTO pe)
        {
            await _playlistEditorsService.Remove(pe);

            return Ok();
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.Common.DTO.Users;
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

        [HttpGet("{playlistId}")]
        public async Task<ActionResult<IEnumerable<ArtistReadDTO>>> GetCollaborators(int playlistId)
        {
            return Ok(await _playlistEditorsService.GetCollaborators(playlistId));
        }

        [HttpPost]
        public async Task<ActionResult> Add([FromBody] PlaylistEditorDTO pe)
        {
            await _playlistEditorsService.Add(pe);

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Remove([FromBody] PlaylistEditorDTO pe)
        {
            await _playlistEditorsService.Remove(pe);

            return Ok();
        }
    }
}

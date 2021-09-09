using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Songs;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class RadioController : ControllerBase
    {
        private readonly IRadioService _radioService;

        public RadioController(IRadioService radioService)
        {
            _radioService = radioService;
        }

        [HttpGet("songRadio/{id}")]
        public async Task<ActionResult<IEnumerable<SongLikedDTO>>> GetRadioBySongIdAsync(int id)
        {
            var songs = await _radioService.GetRadioBySongIdAsync(id, User.GetId());

            return Ok(songs);
        }

        [HttpGet("playlistRadio/{id}")]
        public async Task<ActionResult<IEnumerable<SongLikedDTO>>> GetRadioByPlaylistIdAsync(int id)
        {
            var songs = await _radioService.GetRadioByPlaylistIdAsync(id, User.GetId());

            return Ok(songs);
        }
    }
}

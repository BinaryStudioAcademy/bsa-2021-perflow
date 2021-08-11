using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Songs;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;

namespace Perflow.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = Policies.IsUser)]
    public class SongsController : ControllerBase
    {
        private readonly ISongsService _songsService;

        public SongsController(ISongsService songsService)
        {
            _songsService = songsService;
        }

        [HttpGet("liked")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetLikedSongs()
        {
            var songs = await _songsService.GetLikedSongsAsync(User.GetId());

            return Ok(songs);
        }
        
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetSongsByNameAsync([FromQuery] string searchTerm)
        {
            var songs = await _songsService.FindSongsByNameAsync(searchTerm);

            return Ok(songs);
        }

        [HttpGet("topSongs/{authorId}")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetTopSongsByAuthorIdAsync(int authorId, [FromQuery] int count)
        {
            var songs = await _songsService.GetTopSongsByAuthorIdAsync(authorId, count);

            return Ok(songs);
        }

    }
}

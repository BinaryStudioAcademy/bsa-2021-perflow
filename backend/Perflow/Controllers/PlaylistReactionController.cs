using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Reactions;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class PlaylistReactionController : ControllerBase
    {
        private readonly PlaylistReactionService _playlistReactionService;

        public PlaylistReactionController(PlaylistReactionService playlistService)
        {
            _playlistReactionService = playlistService;
        }

        [HttpGet("liked/{userId}")]
        public async Task<ActionResult<ICollection<PlaylistDTO>>> GetLikedPlaylistsByTheUser(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("User ID cannot be less than or equal to zero");

            return Ok(await _playlistReactionService.GetLikedPlaylistsByTheUser(userId));
        }

        [HttpPost("like")]
        public async Task<ActionResult> LikeAsync([FromBody] NewPlaylistReactionDTO reaction)
        {
            await _playlistReactionService.AddPlaylistReactionAsync(reaction);

            return Ok();
        }

        [HttpPost("removeLike")]
        public async Task<ActionResult> RemoveLikeAsync([FromBody] NewPlaylistReactionDTO reaction)
        {
            await _playlistReactionService.RemovePlaylistReactionAsync(reaction);

            return Ok();
        }
    }
}

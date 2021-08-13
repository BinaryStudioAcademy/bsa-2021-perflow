using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Playlists;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}

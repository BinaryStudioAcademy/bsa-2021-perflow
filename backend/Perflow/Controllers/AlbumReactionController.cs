using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Reactions;
using Perflow.Services.Implementations;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumReactionController : Controller
    {
        private readonly AlbumReactionService _albumReactionService;

        public AlbumReactionController(AlbumReactionService albumReactionService)
        {
            _albumReactionService = albumReactionService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ICollection<AlbumForListDTO>>> Get(int id)
        {
            return Ok(await _albumReactionService.GetAlbumsByUserId(id));
        }

        [HttpPost("like")]
        public async Task<ActionResult> LikeAsync([FromBody] NewAlbumReactionDTO reaction)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _albumReactionService.AddAlbumReaction(reaction);

            return Ok();
        }

        [HttpPost("removeLike")]
        public async Task<ActionResult> RemoveLikeAsync([FromBody] NewAlbumReactionDTO reaction)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _albumReactionService.RemoveAlbumReaction(reaction);

            return Ok();
        }

        [HttpGet("liked/{userId}")]
        public async Task<ActionResult<ICollection<AlbumViewDTO>>> GetLikedPlaylistsByTheUser(int userId)
        {
            if (userId <= 0)
                throw new ArgumentException("User ID cannot be less than or equal to zero");


            return Ok(await _albumReactionService.GetLikedAlbumsByTheUser(userId));
        }
    }
}

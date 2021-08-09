using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Perflow.Common.DTO.Reactions;
using Perflow.Services.Implementations;


namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongReactionController : ControllerBase
    {
        private readonly SongReactionService _songReactionService;

        public SongReactionController(SongReactionService songReactionService)
        {
            _songReactionService = songReactionService;
        }

        [HttpPost("like")]
        public async Task<ActionResult> LikeAsync([FromBody] NewSongReactionDTO songReactionDto)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _songReactionService.LikeSong(songReactionDto);

            return Ok();
        }

        [HttpPost("removeLike")]
        public async Task<ActionResult> RemoveLikeAsync([FromBody] NewSongReactionDTO songReactionDto)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _songReactionService.RemoveLikeSong(songReactionDto);

            return Ok();
        }
    }
}
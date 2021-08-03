using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Perflow.Common.DTO.Reactions;
using Perflow.Services;


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
        public async Task<ActionResult> PostAsync([FromBody] NewSongReactionDTO songReactionDto)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var result = await _songReactionService.LikeSong(songReactionDto);

            return Ok(result);
        }
    }
}
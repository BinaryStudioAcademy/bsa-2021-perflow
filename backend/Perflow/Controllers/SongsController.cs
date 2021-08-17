using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<IEnumerable<SongForPlaylistSongSearchDTO>>> GetSongsByNameAsync([FromQuery] string searchTerm)
        {
            var songs = await _songsService.FindSongsByNameAsync(searchTerm);

            return Ok(songs);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<SongReadDTO>> AddSongInfo(SongWriteDTO songInfo)
        {
            var result = await _songsService.AddSongInfoAsync(songInfo, User.GetId());   
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<SongWriteDTO>> DeleteSongInfo(int id)
        {
            await _songsService.RemoveSongAsync(id);
            return Ok();
        }

        [HttpPost("file/upload")]
        public async Task<ActionResult<object>> AddSongFile()
        {
            var files = Request.Form.Files;
            var result = await _songsService.UploadSongAsync(files.First());   
            return Ok(new { blobId = result });
        }

        [AllowAnonymous]
        [HttpGet("file")]
        public async Task<FileResult> GetSongFile([FromQuery] string blobId)
        {
            var result = (FileResult) await _songsService.GetSongFileAsync(blobId);
            result.EnableRangeProcessing = true;
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SongReadDTO>> GetSong(int id)
        {
            return Ok(await _songsService.FindSongsByIdAsync(id));
        }

        [HttpGet("{id}/isLiked")]
        public async Task<ActionResult<object>> CheckReaction(int id)
        {
            var result = await _songsService.CheckIsLiked(id, User.GetId());

            return Ok(new{isLiked = result});
        }

        [HttpGet("topSongs/{authorId}")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetTopSongsByAuthorIdAsync(int authorId, [FromQuery] int count)
        {
            var songs = await _songsService.GetTopSongsByAuthorIdAsync(authorId, count, User.GetId());

            return Ok(songs);
        }

        [HttpGet("top/{amount}")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetTopSongsByLikes(int amount)
        {
            return Ok(await _songsService.GetTopSongsByLikes(amount));
        }

    }
}

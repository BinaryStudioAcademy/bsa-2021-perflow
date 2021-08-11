using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Songs;
using Perflow.Services.Interfaces;
using System.Web;
using Microsoft.AspNetCore.Http;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
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

        [HttpPost("upload")]
        public async Task<ActionResult<SongWriteDTO>> AddSongInfo(SongWriteDTO songInfo)
        {
            var result = await _songsService.AddSongInfoAsync(songInfo);   
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<SongWriteDTO>> DeleteSongInfo(int id)
        {
            await _songsService.RemoveSongInfoAsync(id);
            return Ok();
        }

        [HttpPost("upload/{id}")]
        public async Task<ActionResult> AddSongFile(int id)
        {
            var files = Request.Form.Files;
            await _songsService.UploadSongAsync(files.First(), id);   
            return Ok();
        }

        [HttpGet("file/{id}")]
        public async Task<FileResult> GetSongFile(int id)
        {
            var result = (FileResult) await _songsService.GetSongFileAsync(id);
            result.EnableRangeProcessing = true;
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SongReadDTO>> GetSong(int id)
        {
            return Ok(await _songsService.FindSongsByIdAsync(id));
        }
    }
}

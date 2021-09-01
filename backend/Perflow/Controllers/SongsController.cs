using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Songs;
using Perflow.Common.Helpers;
using Perflow.Domain.Enums;
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
        private readonly IUsersService _usersService;
        private readonly ISongsService _songsService;
        private readonly ISongFilesService _songFilesService;

        public SongsController(ISongsService songsService, ISongFilesService songFilesService, IUsersService usersService)
        {
            _songsService = songsService;
            _songFilesService = songFilesService;
            _usersService = usersService;
        }

        [HttpGet("liked")]
        public async Task<ActionResult<IEnumerable<SongLikedDTO>>> GetLikedSongs()
        {
            var songs = await _songsService.GetLikedSongsAsync(User.GetId());

            return Ok(songs);
        }

        [HttpGet("likedCount")]
        public async Task<ActionResult<int>> GetLikedSongsCount()
        {
            var songsCount = await _songsService.GetLikedSongsCountAsync(User.GetId());
            return Ok(songsCount);
        }

        // TODO Add Auth
        [AllowAnonymous]
        [HttpGet("{id:int}/file")]
        public async Task<ActionResult> GetSongFile([FromRoute] int id, [FromQuery] AudioQuality? quality = null)
        {
            quality ??= User.HasId() ? await _usersService.GetUserAudioQualityAsync(User.GetId()) : AudioQuality.Medium;

            var songBlob = await _songFilesService.GetSongFileAsync(id, quality.Value);

            if (songBlob == null)
            {
                return NotFound();
            }

            return File(
                songBlob.Content.ToArray(),
                songBlob.ContentType,
                enableRangeProcessing: true
            );
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
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetTopSongsByAuthorIdAsync(int authorId, AuthorType authorType, int count)
        {
            var songs = await _songsService.GetTopSongsByAuthorIdAsync(authorId, count, authorType, User.GetId());

            return Ok(songs);
        }

        [HttpGet("top/{amount}")]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetTopSongsByLikes(int amount)
        {
            return Ok(await _songsService.GetTopSongsByLikes(amount));
        }

        [HttpGet("byAlbum/{id}")]
        public async Task<ActionResult<IEnumerable<SongForAlbumDTO>>> GetSongsByAlbumIdAsync(int id)
        {
            return Ok(await _songsService.GetSongsByAlbumIdAsync(id, User.GetId()));
        }
    }
}

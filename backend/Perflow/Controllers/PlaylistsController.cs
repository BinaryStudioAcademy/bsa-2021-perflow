using System;
using Microsoft.AspNetCore.Mvc;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Playlists;
using Perflow.Services.Implementations;
using Perflow.Common.DTO.Songs;
using Shared.Auth.Extensions;
using System.Linq;
using System.Security.Claims;
using Shared.Auth.Constants;
using Microsoft.AspNetCore.Authorization;
using Perflow.Common.DTO.Users;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class PlaylistsController : ControllerBase
    {
        private readonly PlaylistService _playlistService;

        public PlaylistsController(PlaylistService playlistService)
        {
            _playlistService = playlistService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlaylistDTO>> Get(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Playlist ID cannot be less than or equal to zero");

            var playlist = await _playlistService.GetLikedPlaylistAsync(id, User.GetId());

            if (playlist == null)
                return NotFound("There are no playlist with this Id");

            return Ok(playlist);
        }

        [HttpGet("created")]
        public async Task<ActionResult<ICollection<PlaylistNameDTO>>> GetCreated()
        {
            var playlists = await _playlistService.GetCreatedPlaylistsAsync(User.GetId());
            return Ok(playlists);
        }

        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] PlaylistDTO playlistDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var playlist = await _playlistService.AddEntityAsync(playlistDTO);

            return CreatedAtAction(nameof(Get), new { Id = playlist.Id }, playlist);
        }

        [HttpGet("songs/{id}")]
        public async Task<ActionResult> GetPlaylistSongsAsync(int id)
        {
            var songs = await _playlistService.GetSongsAsync(id, User.GetId());

            return Ok(songs);
        }

        [HttpPost("songs")]
        public async Task<ActionResult> AddSongToPlaylistAsync([FromBody] PlaylistSongDTO playlistSongDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _playlistService.AddSongAsync(playlistSongDTO);

            return Ok();
        }

        [HttpPost("checkSong")]
        public async Task<ActionResult> CheckSongInPlaylistAsync([FromBody] PlaylistSongDTO playlistSongDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            return Ok(await _playlistService.CheckSongInPlaylistAsync(playlistSongDTO));
        }

        [HttpDelete("songs")]
        public async Task<ActionResult> DeleteSongToPlaylistAsync([FromQuery] PlaylistSongDTO playlistSongDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            return Ok(await _playlistService.DeleteSongAsync(playlistSongDTO));
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromForm] PlaylistWriteDTO playlistDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var playlist = await _playlistService.UpdateEntityAsync(playlistDTO);

            return Ok(playlist);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0)
                throw new ArgumentException("Playlist ID cannot be less than or equal to zero");

            var playlist = await _playlistService.GetEntityAsync(id);

            if (playlist == null)
                return NotFound("There are no playlist with this Id");

            return Ok(await _playlistService.DeleteEntityAsync(id));
        }

        [HttpGet("byAuthor/{authorId}")]
        public async Task<ActionResult<IEnumerable<PlaylistViewDTO>>> GetPlaylistsByAuthorIdAsync(int authorId)
        {
            return Ok(await _playlistService.GetPlaylistsByAuthorIdAsync(authorId));
        }

        [HttpGet("byGroup/{groupId}")]
        public async Task<ActionResult<IEnumerable<PlaylistViewDTO>>> GetPlaylistsByGroupIdAsync(int groupId)
        {
            return Ok(await _playlistService.GetPlaylistsByGroupIdAsync(groupId));
        }
        
        [HttpPut("editName")]
        public async Task<ActionResult> EditPlaylistNameAsync(PlaylistNameDTO playlistNameDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            await _playlistService.EditPlaylistNameAsync(playlistNameDTO);

            return Ok();
        }

        [HttpPut("changeAccessType")]
        public async Task<ActionResult<PlaylistNameDTO>> ChangeAccessTypeAsync(PlaylistNameDTO playlistNameDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var result = await _playlistService.ChangeAccessTypeAsync(playlistNameDTO);

            return Ok(result);
        }

        [HttpPost("copy")]
        public async Task<ActionResult<PlaylistNameDTO>> CopyPlaylistAsync(PlaylistNameDTO playlistNameDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var copyedPlaylist = await _playlistService.CopyPlaylistAsync(playlistNameDTO);

            return Ok(copyedPlaylist);
        }

        [HttpGet("userMix")]
        public async Task<ActionResult<IEnumerable<PlaylistViewDTO>>> GetUserMixAsync()
        {
            var playlists = await _playlistService.GetUserMixAsync(User.GetId());

            return Ok(playlists);
        }

        [HttpGet("recommendations")]
        public async Task<ActionResult<IEnumerable<PlaylistViewDTO>>> GetRecommendationsAsync()
        {
            var playlists = await _playlistService.GetRecommendationsAsync(User.GetId());

            return Ok(playlists);
        }
    }
}

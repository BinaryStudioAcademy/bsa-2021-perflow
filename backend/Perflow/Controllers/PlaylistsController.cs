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

        [HttpGet]
        public async Task<ActionResult<ICollection<PlaylistDTO>>> Get()
        {
            return Ok(await _playlistService.GetEntitiesAsync());
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
        public async Task<ActionResult<ICollection<PlaylistDTO>>> GetCreated()
        {
            var email = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email).Value;
            var playlists = await _playlistService.GetEntitiesAsync();
            var sortedPlaylist = new List<PlaylistDTO>();
            foreach(var pl in playlists)
            {
                if(pl.Author.Email == email)
                {
                    sortedPlaylist.Add(pl);
                }
            }
            return Ok(sortedPlaylist);
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

            return Ok(await _playlistService.AddSongAsync(playlistSongDTO));
        }

        [HttpDelete("songs")]
        public async Task<ActionResult> DeleteSongToPlaylistAsync([FromQuery] PlaylistSongDTO playlistSongDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            return Ok(await _playlistService.DeleteSongAsync(playlistSongDTO));
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] PlaylistDTO playlistDTO)
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
    }
}

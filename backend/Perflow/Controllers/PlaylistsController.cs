﻿using System;
using Microsoft.AspNetCore.Mvc;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Playlists;


namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaylistsController : ControllerBase
    {
        private readonly IService<PlaylistDTO> _playlistService;

        public PlaylistsController(IService<PlaylistDTO> playlistService)
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

            var playlist = await _playlistService.GetEntityAsync(id);

            if (playlist == null)
                return NotFound("There are no playlist with this Id");

            return Ok(playlist);
        }


        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] PlaylistDTO playlistDTO)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");

            var playlist = await _playlistService.AddEntityAsync(playlistDTO);

            return CreatedAtAction(nameof(Get), new { Id = playlist.Id }, playlist);
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
    }
}

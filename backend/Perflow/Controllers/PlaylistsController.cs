using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Playlist;

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
                return BadRequest("Playlist ID cannot be less than or equal to zero");

            var playlist = await _playlistService.GetEntityAsync(id);

            if (playlist == null)
                return NotFound("There are no playlist with this Id");

            return Ok(playlist);
        }


        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] PlaylistDTO playlistDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var playlist = await _playlistService.AddEntityAsync(playlistDTO);

                return CreatedAtAction(nameof(Get), new { Id = playlist.Id }, playlist);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPut]
        public async Task<ActionResult> Put([FromBody] PlaylistDTO playlistDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var playlist = await _playlistService.UpdateEntityAsync(playlistDTO);

                return Ok(playlist);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Playlist ID cannot be less than or equal to zero");

            try
            {
                var playlist = await _playlistService.GetEntityAsync(id);

                if (playlist == null)
                    return NotFound("There are no playlist with this Id");

                return Ok(await _playlistService.DeleteEntityAsync(id));
            }
            catch (ArgumentNullException ex)
            {
                return StatusCode(StatusCodes.Status404NotFound, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

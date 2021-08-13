using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Albums;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class AlbumsController : ControllerBase
    {
        private readonly AlbumsService _albumsService;

        public AlbumsController(AlbumsService albumsService)
        {
            _albumsService = albumsService;
        }

        [HttpGet]
        public async Task<ActionResult<AlbumViewDTO>> GetAllAlbums()
        {
            return Ok(await _albumsService.GetAllAlbums());
        }

        [HttpGet("new-releases")]
        public async Task<ActionResult<ICollection<AlbumViewDTO>>> Get()
        {
            return Ok(await _albumsService.GetNewReleases());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumFullDTO>> GetById(int id)
        {
            return Ok(await _albumsService.GetAlbumFullAsync(id));
        }

        [HttpGet("byArtist/{artistId}")]
        public async Task<ActionResult<ICollection<AlbumReadDTO>>> GetByArtistId(int artistId)
        {
            return Ok(await _albumsService.GetAlbumsByArtist(artistId));
        }

        [HttpPost]
        public async Task<ActionResult<AlbumEditDTO>> AddAlbumAsync(AlbumEditDTO albumEditDTO)
        {
            return Ok(await _albumsService.AddEntityAsync(albumEditDTO));
        }

        [HttpPut]
        public async Task<ActionResult<AlbumEditDTO>> UpdateAlbumAsync(AlbumEditDTO albumEditDTO)
        {
            return Ok(await _albumsService.UpdateEntityAsync(albumEditDTO));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteAlbumAsync(int id)
        {
            return Ok(await _albumsService.DeleteEntityAsync(id));
        }
    }
}

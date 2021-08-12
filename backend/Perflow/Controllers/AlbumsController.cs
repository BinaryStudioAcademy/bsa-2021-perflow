using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Albums;
using Perflow.Domain;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
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
        public async Task<ActionResult<ICollection<Album>>> Get()
        {
            return Ok(await _albumsService.GetNewReleases());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumFullDTO>> GetById(int id)
        {
            return Ok(await _albumsService.GetAlbumFullAsync(id, User.GetId()));
        }

        [HttpGet("byArtist/{artistId}")]
        public async Task<ActionResult<ICollection<AlbumReadDTO>>> GetByArtistId(int artistId)
        {
            return Ok(await _albumsService.GetAlbumsByArtist(artistId));
        }
    }
}

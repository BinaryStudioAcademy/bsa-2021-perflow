using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Albums;
using Perflow.Domain.Enums;
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
        public async Task<ActionResult<ICollection<AlbumViewDTO>>> Get()
        {
            return Ok(await _albumsService.GetNewReleases());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumFullDTO>> GetById(int id)
        {
            return Ok(await _albumsService.GetAlbumFullAsync(id, User.GetId()));
        }

        [HttpGet("byArtist/{artistId}")]
        public async Task<ActionResult<ICollection<AlbumForListDTO>>> GetByArtistId(int artistId, AuthorType authorType)
        {
            return Ok(await _albumsService.GetAlbumsByArtist(artistId, authorType));
        }

        [HttpGet("byGroup/unpublished/{groupId}")]
        public async Task<ActionResult<ICollection<AlbumForEditGroupViewDTO>>> GetByGroupIdUnpublished(int groupId)
        {
            return Ok(await _albumsService.GetAlbumsByArtistUnpublished(groupId));
        }

        [HttpGet("viewsByArtist/{artistId}")]
        public async Task<ActionResult<ICollection<AlbumViewDTO>>> GetAlbumsShortInfoByArtistId(int artistId)
        {
            return Ok(await _albumsService.GetAlbumShortInfosByArtist(artistId));
        }

        [HttpPost]
        public async Task<ActionResult<AlbumEditDTO>> AddAlbumAsync([FromForm] AlbumWriteDTO albumEditDTO)
        {
            return Ok(await _albumsService.AddEntityAsync(albumEditDTO));
        }

        [HttpPut]
        public async Task<ActionResult<AlbumEditDTO>> UpdateAlbumAsync([FromForm] AlbumWriteDTO albumEditDTO)
        {
            return Ok(await _albumsService.UpdateEntityAsync(albumEditDTO));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<int>> DeleteAlbumAsync(int id)
        {
            return Ok(await _albumsService.DeleteEntityAsync(id));
        }

        [HttpPut("publicStatus")]
        public async Task<ActionResult> SetPublicStatusAsync(AlbumPublicStatusDTO status)
        {
            await _albumsService.SetPublicStatusAsync(status);

            return Ok();
        }

        [HttpGet("newestFive")]
        public async Task<ActionResult<IEnumerable<AlbumForNewestFiveDTO>>> GetFiveNewestAlbumsAsync()
        {
            return Ok(await _albumsService.GetFiveNewestAlbumsAsync(User.GetId()));
        }
    }
}

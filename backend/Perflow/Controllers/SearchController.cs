using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Search;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class SearchController : ControllerBase
    {
        private readonly SearchService _searchService;
        public SearchController(SearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("songs")]
        public async Task<ActionResult<ICollection<SongForPlaylistSongSearchDTO>>> FindSongsByNameAsync([FromQuery] string searchTerm, int amount)
        {
            return Ok(await _searchService.FindSongsByNameAsync(searchTerm, amount, User.GetId()));
        }
    
        [HttpGet("artists")]
        public async Task<ActionResult<ICollection<ArtistReadDTO>>> FindArtistsByNameAsync([FromQuery] string searchTerm, int amount)
        {
            return Ok(await _searchService.FindArtistsByNameAsync(searchTerm, amount));
        }

        [HttpGet("albums")]
        public async Task<ActionResult<ICollection<AlbumForListDTO>>> FindAlbumsByNameAsync([FromQuery] string searchTerm, int amount)
        {
            return Ok(await _searchService.FindAlbumsByNameAsync(searchTerm, amount));
        }

        [HttpGet("playlists")]
        public async Task<ActionResult<ICollection<PlaylistViewDTO>>> FindPlaylistsByNameAsync([FromQuery] string searchTerm, int amount)
        {
            return Ok(await _searchService.FindPlaylistsByNameAsync(searchTerm, amount));
        }

        [HttpGet("{searchTerm}")]
        public async Task<ActionResult<SearchResultDTO>> FindAllByNameAsync([FromRoute] string searchTerm)
        {
            return Ok(await _searchService.FindAllByNameAsync(searchTerm, User.GetId()));
        }
    }
}

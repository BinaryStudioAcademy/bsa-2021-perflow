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
using Perflow.Common.DTO.Groups;

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
        public async Task<ActionResult<ICollection<SongForPlaylistSongSearchDTO>>> FindSongsByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            return Ok(await _searchService.FindSongsByNameAsync(searchTerm, page, itemsOnPage, User.GetId()));
        }
    
        [HttpGet("artists")]
        public async Task<ActionResult<ICollection<ArtistReadDTO>>> FindArtistsByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            return Ok(await _searchService.FindArtistsByNameAsync(searchTerm, page, itemsOnPage));
        }

        [HttpGet("users")]
        public async Task<ActionResult<ICollection<ArtistReadDTO>>> FindUsersByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            return Ok(await _searchService.FindUsersByNameAsync(searchTerm, page, itemsOnPage));
        }

        [HttpGet("groups")]
        public async Task<ActionResult<ICollection<GroupShortDTO>>> FindGroupsByNameAsync
            (string searchTerm, int page, int itemsOnPage, int userId)
        {
            return Ok(await _searchService.FindGroupsByNameAsync(searchTerm, page, itemsOnPage, User.GetId()));
        }

        [HttpGet("albums/{onlyPublished}")]
        public async Task<ActionResult<ICollection<AlbumForListDTO>>> FindAlbumsByNameAsync
            (bool onlyPublished, string searchTerm, int page, int itemsOnPage)
        {
            return Ok(await _searchService.FindAlbumsByNameAsync(onlyPublished, searchTerm, page, itemsOnPage));
        }

        [HttpGet("playlists")]
        public async Task<ActionResult<ICollection<PlaylistViewDTO>>> FindPlaylistsByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            return Ok(await _searchService.FindPlaylistsByNameAsync(searchTerm, page, itemsOnPage));
        }

        [HttpGet("{searchTerm}")]
        public async Task<ActionResult<SearchResultDTO>> FindAllByNameAsync([FromRoute] string searchTerm)
        {
            return Ok(await _searchService.FindAllByNameAsync(searchTerm, User.GetId()));
        }
    }
}

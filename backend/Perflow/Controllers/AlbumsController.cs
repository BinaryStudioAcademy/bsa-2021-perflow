using Microsoft.AspNetCore.Mvc;
using Perflow.Domain;
using Perflow.Services.Implementations;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private readonly AlbumsService _albumsService;

        public AlbumsController(AlbumsService albumsService)
        {
            _albumsService = albumsService;
        }

        [HttpGet("new-releases")]
        public async Task<ActionResult<ICollection<Album>>> Get()
        {
            return Ok(await _albumsService.GetNewReleases());
        }
    }
}

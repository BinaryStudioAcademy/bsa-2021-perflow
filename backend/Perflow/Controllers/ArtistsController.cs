using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using Shared.Auth.Constants;
using System.Threading.Tasks;
using Shared.Auth.Extensions;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class ArtistsController : ControllerBase
    {
        private readonly IArtistService _artistService;

        public ArtistsController(IArtistService artistService)
        {
            _artistService = artistService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistFullDTO>> GetById(int id)
        {
            return Ok(await _artistService.GetArtistFullAsync(id, User.GetId()));
        }

        [HttpGet("top/{amount}")]
        public async Task<ActionResult<IEnumerable<ArtistReadDTO>>> GetTopArtistsByLikes(int amount)
        {
            return Ok(await _artistService.GetTopArtistsByLikes(amount));
        }
    }
}

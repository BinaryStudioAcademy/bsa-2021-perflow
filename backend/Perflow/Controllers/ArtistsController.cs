using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using System.Threading.Tasks;

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
        public async Task<ActionResult<ArtistDTO>> GetById(int id)
        {
            return Ok(await _artistService.GetArtistAsync(id));
        }
    }
}

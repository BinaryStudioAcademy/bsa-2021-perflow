using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using Perflow.Services.Interfaces;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : ControllerBase
    {
        private readonly IUserService _userService;

        public ArtistsController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistDTO>> GetById(int id)
        {
            return Ok(await _userService.GetArtistAsync(id));
        }
    }
}

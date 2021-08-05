using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Perflow.Common.DTO.Users;
using Perflow.Services;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistReactionController : ControllerBase
    {
        private readonly ArtistReactionService _artistReactionService;

        public ArtistReactionController(ArtistReactionService artistReactionService)
        {
            _artistReactionService = artistReactionService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ICollection<ArtistReadDTO>>> Get(int id)
        {
            return Ok(await _artistReactionService.GetArtistsByUserId(id));
        }
    }
}

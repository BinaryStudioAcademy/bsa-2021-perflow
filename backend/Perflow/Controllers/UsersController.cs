using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using Perflow.Services.Interfaces;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UserReadDTO user)
        {
            await _userService.UpdateUserAsync(user);

            return NoContent();
        }

        [HttpPut("changePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePasswordDTO user)
        {
            await _userService.ChangePasswordAsync(user);

            return NoContent();
        }

    }
}

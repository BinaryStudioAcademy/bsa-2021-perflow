using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Auth;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using Shared.Auth.Models;

namespace Perflow.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDTO register)
        {
            var registerData = new RegisterData(register.UserName, register.Email, register.Password);

            var registerResult = await _authService.RegisterUserAsync(registerData);
            return registerResult.Match<ActionResult>(
                success => Ok(),
                error => BadRequest()
            );
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO login)
        {
            var loginData = new LoginData(login.AccessToken, login.FirebaseId, login.Email, login.UserName);

            var loginResult = await _authService.LoginAsync(loginData);
            return loginResult.Match<ActionResult>(
                success => Ok(),
                error => BadRequest()
            );
        }

        [HttpPost("role")]
        public async Task<ActionResult> SetRole([FromBody] SetRoleDTO setRoleDTO)
        {
            var result = await _authService.SetRoleAsync(setRoleDTO.TargetUserId, setRoleDTO.Role);
            return result.Match<ActionResult>(
                success => Ok(),
                notFound => NotFound(),
                error => BadRequest()
            );
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteUser([FromRoute] int id)
        {
            var result = await _authService.DeleteUserAsync(id);
            return result.Match<ActionResult>(
                success => Ok(),
                notFound => NotFound(),
                error => BadRequest()
            );
        }

        // TODO Remove when needed
        // This endpoint is used to test auth locally
        // And serves as a showcase of how to get auth data
        [HttpGet("test")]
        [Authorize(Policy = Policies.IsUser)]
        public ActionResult GetSecret()
        {
            return Ok(new
            {
                Id = User.GetId(),
                Role = User.GetRole().ToString()
            });
        }
    }
}

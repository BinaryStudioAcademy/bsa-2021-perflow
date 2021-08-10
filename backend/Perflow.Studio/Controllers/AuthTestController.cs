using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;

namespace Perflow.Studio.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class AuthTestController : ControllerBase
    {
        // TODO Remove when needed
        // This endpoint is used to test auth locally
        // And serves as a showcase of how to get auth data
        [HttpGet]
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

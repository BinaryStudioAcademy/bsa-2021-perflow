using System;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public UsersController() { }

        [HttpPut]
        public Task<ActionResult> Put([FromBody] UserReadDTO user)
        {
            throw new NotImplementedException();
        }

        [HttpPut("changePassword")]
        public Task<ActionResult> ChangePassword([FromBody] UserChangePasswordDTO user)
        {
            throw new NotImplementedException();
        }

    }
}

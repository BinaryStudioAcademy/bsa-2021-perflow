using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Users;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Shared.Auth.Constants;
using Perflow.Services.Interfaces;
using AutoMapper;
using Shared.Auth.Extensions;
using FirebaseAdmin.Auth;
using System;
using Perflow.Services.Implementations;
using Perflow.Domain;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IAuthService _authService;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public UsersController(IUsersService usersService, IAuthService authService, IMapper mapper, IImageService imageService)
        {
            _usersService = usersService;
            _authService = authService;
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDTO>> Get(int id)
        {
            var user = await _usersService.GetUserAsync(id);

            var userDto = _mapper.Map<(User, string), UserReadDTO>((user, _imageService.GetImageUrl(user.IconURL)));

            return Ok(userDto);
        }

        [HttpGet("{id}/image")]
        public async Task<ActionResult<object>> GetImage(int id)
        {
            var imageUrl = await _usersService.GetUserImage(id);

            return Ok(new { imageUrl });
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UserReadDTO user)
        {
            var updatedUser = await _usersService.GetUserAsync(user.Id);

            var userArgs = new UserRecordArgs
            {
                Uid = updatedUser.FirebaseId,
                DisplayName = user.UserName,
                Email = user.Email
            };

            await _usersService.UpdateUserAsync(_mapper.Map(user, updatedUser));

            var result = await _authService.UpdateUserAsync(userArgs);
            return result.Match<ActionResult>(
                success => NoContent(),
                error => BadRequest()
            );
        }

        [HttpPut("changePassword")]
        public async Task<ActionResult> ChangePassword([FromBody] UserChangePasswordDTO user)
        {
            var userArgs = new UserRecordArgs
            {
                Uid = User.GetFirebaseId(),
                Password = user.NewPassword
            };

            var result = await _authService.UpdateUserAsync(userArgs);
            return result.Match<ActionResult>(
                success => NoContent(),
                error => BadRequest()
            );
        }

        [HttpPut("changeIcon")]
        public async Task<ActionResult<string>> Put([FromForm] UserChangeIconDTO userChangeIconDTO)
        {
            var uri = await _usersService.UpdateUserIconAsync(userChangeIconDTO);

            return Ok(new { uri });
        }
    }
}

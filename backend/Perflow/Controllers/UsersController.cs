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
using Perflow.Common.Helpers;
using Shared.Auth;

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

            var userDto = _mapper.Map<UserReadDTO>(new UserWithIcon(user, _imageService.GetImageUrl(user.IconURL)));

            return Ok(userDto);
        }

        [HttpGet("{id}/image")]
        public async Task<ActionResult<object>> GetImage(int id)
        {
            var imageUrl = await _usersService.GetUserImage(id);

            return Ok(new { imageUrl });
        }

        [HttpGet("settings")]
        public async Task<ActionResult<UserSettings>> GetSettings()
        {
            var userSettings = await _usersService.GetUserSettingsAsync(User.GetId());

            return Ok(userSettings);
        }

        [HttpGet("artistApplicant")]
        public async Task<ActionResult<PerflowStudioApplicant>> GetArtistApplicant()
        {
            var userSettings = await _usersService.GetArtistApplicantAsync(User.GetId());

            return Ok(userSettings);
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

        [HttpPut("changeSettings")]
        public async Task<ActionResult> ChangeSettings([FromBody] UserChangeSettingsDTO userSettings)
        {
            if (!ModelState.IsValid)
                throw new ArgumentException("Model is not valid.");
            userSettings.UserId = User.GetId();
            await _usersService.UpdateUserSettingsAsync(userSettings);
            return Ok();
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

        [HttpPost("createApplicant")]
        public async Task<ActionResult> CreateArtistApplicant([FromBody] ArtistApplicantDTO artistApplicant)
        {
            await _usersService.CreateArtistApplicantAsync(User.GetId(), artistApplicant);
            return Ok();
        }
    }
}

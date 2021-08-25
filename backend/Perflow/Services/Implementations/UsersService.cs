using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Interfaces;
using Shared.Auth;

namespace Perflow.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly PerflowContext _context;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public UsersService(PerflowContext context, IMapper mapper, IImageService imageService)
        {
            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }

        public async ValueTask<User> GetUserAsync(int id)
        {
            var userEntity = await _context.Users.FindAsync(id);
            if(await CheckUserSettingsAsync(id) == false)
            {
                _context.UserSettings.Add(new Domain.UserSettings() { UserId = id });
                await _context.SaveChangesAsync();
            }
            return userEntity;
        }

        public async Task<string> GetUserImage(int id)
        {
            var userImage = (await GetUserAsync(id)).IconURL;

            return _imageService.GetImageUrl(userImage);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> CreateUserAsync(UserWriteDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var userEntity = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            _context.UserSettings.Add(new Domain.UserSettings() { UserId = userEntity.Entity.Id });
            await _context.SaveChangesAsync();
            return userEntity.Entity;
        }

        public async Task<ArtistApplicant> CreateArtistApplicantAsync(string email, int userRole)
        {
            while(!await _context.Users.AnyAsync(u => u.Email == email))
            {
                await Task.Delay(25);
            }
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            var result = await _context.ArtistApplicants.AddAsync(new ArtistApplicant(user.Id, (UserRole)userRole));
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<UserSettings> GetUserSettingsAsync(int userId)
        {
            return await _context.UserSettings.FirstAsync(us => us.UserId == userId);
        }

        public async Task<bool> CheckUserSettingsAsync(int userId)
        {
            return await _context.UserSettings.AnyAsync(us => us.UserId == userId);
        }

        public async Task UpdateUserSettingsAsync(UserChangeSettingsDTO userSettings)
        {
            var updatedSettings = await _context.UserSettings
                                                    .AsNoTracking()
                                                    .FirstOrDefaultAsync(us => us.Id == userSettings.Id);
            updatedSettings = _mapper.Map<UserSettings>(userSettings);
            _context.UserSettings.Update(updatedSettings);
            await _context.SaveChangesAsync();  
        }

        public async Task DeleteUserAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<string> UpdateUserIconAsync(UserChangeIconDTO userChangeIconDTO)
        {
            var updatedUser = await GetUserAsync(userChangeIconDTO.Id);

            var oldImageId = updatedUser.IconURL;

            updatedUser.IconURL = await _imageService.UploadImageAsync(userChangeIconDTO.Icon);

            _imageService.DeleteImageAsync(oldImageId);

            await UpdateUserAsync(updatedUser);

            return _imageService.GetImageUrl(updatedUser.IconURL);
        }
    }
}

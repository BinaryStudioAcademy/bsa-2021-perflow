using System.Threading.Tasks;
using AutoMapper;
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
            return await _context.Users.FindAsync(id);
        }

        public async ValueTask<User> GetUserByFirebaseIdAsync(string firebaseId)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.FirebaseId == firebaseId);
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

            var userEntity = _context.Users.Add(user);
            _context.UserSettings.Add(new UserSettings { UserId = userEntity.Entity.Id });

            await _context.SaveChangesAsync();
            return userEntity.Entity;
        }

        public async Task<ArtistApplicant> CreateArtistApplicantAsync(int userId, UserRole userRole)
        {
            var result = await _context.ArtistApplicants.AddAsync(new ArtistApplicant(userId, userRole));
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<ArtistApplicant> GetArtistApplicantAsync(int userId)
        {
            return await _context.ArtistApplicants.FirstOrDefaultAsync(us => us.UserId == userId && us.Status != Domain.Enums.ApplicationStatus.Approved);
        }

        public async Task<UserSettings> GetUserSettingsAsync(int userId)
        {
            return await _context.UserSettings.FirstAsync(us => us.UserId == userId);
        }

        public async Task EnsureUserSettingsCreated(int userId)
        {
            if (await _context.UserSettings.AnyAsync(us => us.UserId == userId))
            {
                return;
            }

            _context.UserSettings.Add(new UserSettings { UserId = userId });
            await _context.SaveChangesAsync();
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

            _ = _imageService.DeleteImageAsync(oldImageId);

            await UpdateUserAsync(updatedUser);

            return _imageService.GetImageUrl(updatedUser.IconURL);
        }
    }
}

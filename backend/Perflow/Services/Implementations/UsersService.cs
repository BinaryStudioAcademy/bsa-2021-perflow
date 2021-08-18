using System.Threading.Tasks;
using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Interfaces;

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

        public ValueTask<User> GetUserAsync(int id)
        {
            return _context.Users.FindAsync(id);
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

            return userEntity.Entity;
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

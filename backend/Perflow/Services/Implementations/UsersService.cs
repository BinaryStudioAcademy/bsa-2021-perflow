using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Interfaces;

namespace Perflow.Services.Implementations
{
    public class UsersService : IUsersService
    {
        private readonly PerflowContext _context;
        private readonly IMapper _mapper;

        public UsersService(PerflowContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
            return (await _context.Users.FindAsync(id)).IconURL;
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> CreateUserAsync(UserWriteDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            using var transaction = _context.Database.BeginTransaction();
            var userEntity = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            _context.UserSettings.Add(new Domain.UserSettings() { UserId = userEntity.Entity.Id });
            await _context.SaveChangesAsync();
            transaction.Commit();
            return userEntity.Entity;
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

        public async Task UpdateUserIconAsync(UserChangeIconDTO userChangeIconDTO)
        {
            var updatedUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == userChangeIconDTO.Id);
            updatedUser.IconURL = userChangeIconDTO.IconURL;

            _context.Entry(updatedUser).State = EntityState.Modified;

            await _context.SaveChangesAsync();
        }
    }
}

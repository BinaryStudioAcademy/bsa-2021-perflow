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

        public ValueTask<User> GetUserAsync(int id)
        {
            return _context.Users.FindAsync(id);
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

            var userEntity = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return userEntity.Entity;
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

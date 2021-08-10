using System.Threading.Tasks;
using Perflow.Common.DTO.Users;
using Perflow.Domain;

namespace Perflow.Services.Interfaces
{
    public interface IUsersService
    {
        public ValueTask<User> GetUserAsync(int id);

        public Task UpdateUserAsync(User user);

        public Task<User> CreateUserAsync(UserWriteDTO userDto);

        public Task DeleteUserAsync(User user);
    }
}

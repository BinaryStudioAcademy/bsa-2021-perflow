using System.Threading.Tasks;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
using Shared.Auth;

namespace Perflow.Services.Interfaces
{
    public interface IUsersService
    {
        public ValueTask<User> GetUserAsync(int id);
        public Task UpdateUserAsync(User user);
        public Task<User> CreateUserAsync(UserWriteDTO userDto);
        public Task<UserSettings> GetUserSettingsAsync(int userId);
        public Task<ArtistApplicant> CreateArtistApplicantAsync(string email, int userRole);
        public Task DeleteUserAsync(User user);
        public Task UpdateUserSettingsAsync(UserChangeSettingsDTO userSettings);
        public Task<string> GetUserImage(int id);
        public Task<string> UpdateUserIconAsync(UserChangeIconDTO userChangeIconDTO);
    }
}

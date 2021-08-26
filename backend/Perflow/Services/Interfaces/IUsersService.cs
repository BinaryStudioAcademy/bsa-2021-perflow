using System.Threading.Tasks;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
using Shared.Auth;

namespace Perflow.Services.Interfaces
{
    public interface IUsersService
    {
        public ValueTask<User> GetUserAsync(int id);

        public ValueTask<User> GetUserByFirebaseIdAsync(string firebaseId);

        public Task UpdateUserAsync(User user);

        public Task<User> CreateUserAsync(UserWriteDTO userDto);

        public Task EnsureUserSettingsCreated(int userId);

        public Task<UserSettings> GetUserSettingsAsync(int userId);

        public Task<ArtistApplicant> GetArtistApplicantAsync(int userId);

        public Task<ArtistApplicant> CreateArtistApplicantAsync(int userId, UserRole userRole);
        
        public Task DeleteUserAsync(User user);

        public Task UpdateUserSettingsAsync(UserChangeSettingsDTO userSettings);

        public Task<string> GetUserImage(int id);

        public Task<string> UpdateUserIconAsync(UserChangeIconDTO userChangeIconDTO);
    }
}

using System.Threading.Tasks;
using Perflow.Domain.Enums;
using Perflow.Services.Interfaces;

namespace Perflow.Common.Helpers
{
    public static class UsersServiceExtensions
    {
        public static async Task<AudioQuality> GetUserAudioQualityAsync(this IUsersService usersService, int userId)
        {
            var settings = await usersService.GetUserSettingsAsync(userId);
            return settings.Quality;
        }
    }
}

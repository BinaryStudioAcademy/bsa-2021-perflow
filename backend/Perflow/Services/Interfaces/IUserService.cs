using Perflow.Common.DTO.Users;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface IUserService
    {
        Task ChangePasswordAsync(UserChangePasswordDTO user);

        Task UpdateUserAsync(UserReadDTO user);

        Task<ArtistDTO> GetArtistAsync(int id);
    }
}

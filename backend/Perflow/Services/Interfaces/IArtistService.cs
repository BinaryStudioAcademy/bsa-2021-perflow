using Perflow.Common.DTO.Users;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface IArtistService
    {
        Task<ArtistDTO> GetArtistAsync(int id);

        Task<IEnumerable<ArtistReadDTO>> GetTopArtistsByLikes(int amount);

        Task<IEnumerable<ArtistReadDTO>> GetAllArtistsAsync();
    }
}

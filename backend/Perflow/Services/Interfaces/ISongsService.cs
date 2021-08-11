using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Songs;

namespace Perflow.Services.Interfaces
{
    public interface ISongsService
    {
        public Task<IEnumerable<SongReadDTO>> GetLikedSongsAsync(int userId);
        public Task<IEnumerable<SongReadDTO>> FindSongsByNameAsync(string searchTerm);
        public Task<IEnumerable<SongReadDTO>> GetTopSongsByAuthorIdAsync(int id, int count);
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Songs;

namespace Perflow.Services.Interfaces
{
    public interface ISongsService
    {
        public Task<IEnumerable<SongReadDTO>> GetLikedSongsAsync(int userId);
    }
}

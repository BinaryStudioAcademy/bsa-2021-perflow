using Perflow.Common.DTO.Songs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface IRadioService
    {
        Task<IEnumerable<SongLikedDTO>> GetRadioBySongIdAsync(int songId, int userId);

        Task<IEnumerable<SongLikedDTO>> GetRadioByPlaylistIdAsync(int playlistId, int userId);
    }
}

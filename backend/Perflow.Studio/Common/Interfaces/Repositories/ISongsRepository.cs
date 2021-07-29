using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Common.Interfaces.Repositories
{
    public interface ISongsRepository : IRepository<Song>
    {
        public Task<SongReadDTO?> ReadAsDTOAsync(int id);

        public Task<IEnumerable<SongReadDTO>> ReadAllAsDTOAsync();
    }
}

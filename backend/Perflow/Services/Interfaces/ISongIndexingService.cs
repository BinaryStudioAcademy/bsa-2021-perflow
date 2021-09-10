using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface ISongIndexingService
    {
        public Task IndexSongs(List<int> songIds);
    }
}

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Business.Songs.Queries;
using Perflow.Studio.Services.Interfaces.Repositories;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class GetAllSongsHandler : IRequestHandler<GetAllSongsQuery, IEnumerable<SongReadDTO>>
    {
        private readonly ISongsRepository _songsRepository;

        public GetAllSongsHandler(ISongsRepository songsRepository)
        {
            _songsRepository = songsRepository;
        }

        public async Task<IEnumerable<SongReadDTO>> Handle(GetAllSongsQuery request, CancellationToken cancellationToken)
        {
            var songDTOs = await _songsRepository.ReadAllAsDTOAsync();

            return songDTOs;
        }
    }
}

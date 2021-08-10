using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Business.Songs.Queries;
using Perflow.Studio.Services.Interfaces.Repositories;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class GetSpecificSongHandler : IRequestHandler<GetSpecificSongQuery, OneOf<SongReadDTO, NotFound>>
    {
        private readonly ISongsRepository _songsRepository;

        public GetSpecificSongHandler(ISongsRepository songsRepository)
        {
            _songsRepository = songsRepository;
        }

        public async Task<OneOf<SongReadDTO, NotFound>> Handle(GetSpecificSongQuery request, CancellationToken cancellationToken)
        {
            var songDto = await _songsRepository.ReadAsDTOAsync(request.Id);

            if (songDto == null)
            {
                return new NotFound();
            }

            return songDto;
        }
    }
}

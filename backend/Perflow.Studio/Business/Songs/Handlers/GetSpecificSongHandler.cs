using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Business.Songs.Queries;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class GetSpecificSongHandler : IRequestHandler<GetSpecificSongQuery, OneOf<SongReadDTO, NotFound>>
    {
        private readonly IReadRepository<Song> _songsRepository;
        private readonly IMapper _mapper;

        public GetSpecificSongHandler(IReadRepository<Song> songsRepository, IMapper mapper)
        {
            _songsRepository = songsRepository;
            _mapper = mapper;
        }

        public async Task<OneOf<SongReadDTO, NotFound>> Handle(GetSpecificSongQuery request, CancellationToken cancellationToken)
        {
            var song = await _songsRepository.ReadAsync(request.Id);

            if (song == null)
            {
                return new NotFound();
            }

            return _mapper.Map<Song, SongReadDTO>(song);
        }
    }
}

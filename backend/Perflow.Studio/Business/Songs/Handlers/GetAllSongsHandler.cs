using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Business.Songs.Queries;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class GetAllSongsHandler : IRequestHandler<GetAllSongsQuery, IEnumerable<SongReadDTO>>
    {
        private readonly IReadRepository<Song> _songsRepository;
        private readonly IMapper _mapper;

        public GetAllSongsHandler(IReadRepository<Song> songsRepository, IMapper mapper)
        {
            _songsRepository = songsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SongReadDTO>> Handle(GetAllSongsQuery request, CancellationToken cancellationToken)
        {
            var songs = await _songsRepository.ReadAllAsync();

            return _mapper.Map<IEnumerable<Song>, IEnumerable<SongReadDTO>>(songs);
        }
    }
}

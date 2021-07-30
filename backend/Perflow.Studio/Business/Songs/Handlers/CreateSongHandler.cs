using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Common.Interfaces;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class CreateSongHandler : IRequestHandler<CreateSongCommand, SongReadDTO>
    {
        private readonly IWriteRepository<Song> _songsRepository;
        private readonly IMapper _mapper;
        private readonly IDateProvider _dateProvider;

        public CreateSongHandler(IWriteRepository<Song> songsRepository, IMapper mapper, IDateProvider dateProvider)
        {
            _songsRepository = songsRepository;
            _mapper = mapper;
            _dateProvider = dateProvider;
        }

        public async Task<SongReadDTO> Handle(CreateSongCommand request, CancellationToken cancellationToken)
        {
            var song = _mapper.Map<SongWriteDTO, Song>(request.Dto);

            song.CreatedAt = _dateProvider.Now;

            var addedSong = await _songsRepository.AddAsync(song);

            return _mapper.Map<Song, SongReadDTO>(addedSong);
        }
    }
}

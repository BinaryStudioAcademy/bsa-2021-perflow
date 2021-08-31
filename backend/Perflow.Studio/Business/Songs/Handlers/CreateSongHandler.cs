using System.Data;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Domain.Entities;
using Perflow.Studio.Services.Extensions.DapperExtensions;
using Perflow.Studio.Services.Interfaces;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class CreateSongHandler : IRequestHandler<CreateSongCommand, SongReadDTO>
    {
        private readonly IDbConnection _connection;
        private readonly IMapper _mapper;
        private readonly IDateProvider _dateProvider;

        public CreateSongHandler(IMapper mapper, IDateProvider dateProvider, IDbConnection connection)
        {
            _mapper = mapper;
            _dateProvider = dateProvider;
            _connection = connection;
        }

        public async Task<SongReadDTO> Handle(CreateSongCommand request, CancellationToken cancellationToken)
        {
            var song = _mapper.Map<SongWriteDTO, Song>(request.Dto);

            song.CreatedAt = _dateProvider.Now;
            song.ArtistId = request.AuthorId;

            var addedSong = await _connection.SongAddAsync(song);

            return _mapper.Map<Song, SongReadDTO>(addedSong);
        }
    }
}

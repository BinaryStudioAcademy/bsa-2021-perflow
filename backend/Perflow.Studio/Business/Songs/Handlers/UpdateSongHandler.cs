using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Domain.Entities;
using Perflow.Studio.Services.Interfaces.Repositories;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class UpdateSongHandler : IRequestHandler<UpdateSongCommand, OneOf<Success, NotFound>>
    {
        private readonly IRepository<Song> _songsRepository;
        private readonly IMapper _mapper;

        public UpdateSongHandler(IRepository<Song> songsRepository, IMapper mapper)
        {
            _songsRepository = songsRepository;
            _mapper = mapper;
        }

        public async Task<OneOf<Success, NotFound>> Handle(UpdateSongCommand request, CancellationToken cancellationToken)
        {
            var song = await _songsRepository.ReadAsync(request.Id);

            if (song == null)
            {
                return new NotFound();
            }

            _mapper.Map(request.Dto, song);

            await _songsRepository.UpdateAsync(song);

            return new Success();
        }
    }
}

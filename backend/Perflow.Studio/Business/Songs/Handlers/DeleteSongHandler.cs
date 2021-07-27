using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Common.Interfaces.Repositories;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Songs.Handlers
{
    public class DeleteSongHandler : IRequestHandler<DeleteSongCommand, OneOf<Success, NotFound>>
    {
        private readonly IRepository<Song> _songsRepository;
        public DeleteSongHandler(IRepository<Song> songsRepository)
        {
            _songsRepository = songsRepository;
        }

        public async Task<OneOf<Success, NotFound>> Handle(DeleteSongCommand request, CancellationToken cancellationToken)
        {
            var song = await _songsRepository.ReadAsync(request.Id);

            if (song == null)
            {
                return new NotFound();
            }

            await _songsRepository.DeleteAsync(song);

            return new Success();
        }
    }
}

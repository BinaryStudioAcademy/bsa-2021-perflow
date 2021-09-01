using MediatR;
using Perflow.Studio.Business.Songs.DTOs;

namespace Perflow.Studio.Business.Songs.Commands
{
    public class SetSongOrderCommand : IRequest
    {
        public SongOrderDTO[] Orders { get; }

        public SetSongOrderCommand(SongOrderDTO[] orders)
        {
            Orders = orders;
        }
    }
}

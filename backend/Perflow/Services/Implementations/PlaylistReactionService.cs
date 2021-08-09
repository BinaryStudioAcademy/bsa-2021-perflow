using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Playlists;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class PlaylistReactionService : BaseService
    {
        public PlaylistReactionService(PerflowContext context, IMapper mapper) : base(context, mapper){}

        public async Task<IEnumerable<PlaylistDTO>> GetLikedPlaylistsByTheUser(int userId)
        {
            var likedPlaylists = await context.Playlists
                                        .Include(playlist => playlist.Reactions
                                                                     .Where(r => r.UserId == userId))
                                        .Where(playlist => playlist.Reactions.Any())
                                        .ToListAsync();

            return mapper.Map<IEnumerable<PlaylistDTO>>(likedPlaylists.ToList());
        }
    }
}

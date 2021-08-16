using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Reactions;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class PlaylistReactionService : BaseService
    {
        public PlaylistReactionService(PerflowContext context, IMapper mapper) : base(context, mapper) { }

        public async Task<IEnumerable<PlaylistViewDTO>> GetLikedPlaylistsByTheUser(int userId)
        {
            var likedPlaylists = await context.PlaylistReactions
                .Where(playlist => playlist.UserId == userId)
                .Select(p => p.Playlist)
                .ToListAsync();

            return mapper.Map<IEnumerable<PlaylistViewDTO>>(likedPlaylists);
        }

        public async Task AddPlaylistReactionAsync(NewPlaylistReactionDTO reaction)
        {
            if (reaction == null)
            {
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");
            }

            var isReactionExist = context.PlaylistReactions
                .Any(r => r.UserId == reaction.UserId && r.PlaylistId == reaction.PlaylistId);

            if (isReactionExist)
            {
                throw new ArgumentException("Reaction already exists");
            }

            var playlistReaction = new PlaylistReaction()
            {
                PlaylistId = reaction.PlaylistId,
                UserId = reaction.UserId
            };

            await context.PlaylistReactions.AddAsync(playlistReaction);

            await context.SaveChangesAsync();
        }

        public async Task RemovePlaylistReactionAsync(NewPlaylistReactionDTO reaction)
        {
            if (reaction == null)
            {
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");
            }

            var existingReaction = context.PlaylistReactions
                .FirstOrDefault(r => r.UserId == reaction.UserId && r.PlaylistId == reaction.PlaylistId);

            if (existingReaction == null)
            {
                throw new ArgumentException("Reaction doesn't exist");
            }

            context.PlaylistReactions.Remove(existingReaction);

            await context.SaveChangesAsync();
        }
    }
}

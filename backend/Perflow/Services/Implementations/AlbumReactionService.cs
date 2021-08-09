using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Reactions;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;

namespace Perflow.Services.Implementations
{
    public class AlbumReactionService : BaseService
    {
        public AlbumReactionService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<ICollection<AlbumForListDTO>> GetAlbumsByUserId(int userId)
        {
            var albums = context.AlbumReactions
                .Include(ar => ar.Album)
                .ThenInclude(al => al.Author)
                .Where(r => r.UserId == userId)
                .Select(albumReaction => albumReaction.Album);

            return mapper.Map<ICollection<AlbumForListDTO>>(albums);
        }

        public async Task AddAlbumReaction(NewAlbumReactionDTO reaction)
        {
            if (reaction == null)
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");

            var reactions = context.AlbumReactions.Where(x =>
                x.UserId == reaction.UserId && x.AlbumId == reaction.AlbumId);

            if (reactions.Any())
            {
                throw new ArgumentException("Reaction already exists");
            }

            var albumReaction = new AlbumReaction()
            {
                AlbumId = reaction.AlbumId,
                UserId = reaction.UserId
            };

            await context.AlbumReactions.AddAsync(albumReaction);

            await context.SaveChangesAsync();
        }

        public async Task RemoveAlbumReaction(NewAlbumReactionDTO reaction)
        {
            if (reaction == null)
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");

            var reactions = context.AlbumReactions.Where(x =>
                x.UserId == reaction.UserId && x.AlbumId == reaction.AlbumId);

            if (!reactions.Any())
            {
                throw new ArgumentException("Reaction already exists");
            }

            context.AlbumReactions.RemoveRange(reactions);

            await context.SaveChangesAsync();

        }

    }

}
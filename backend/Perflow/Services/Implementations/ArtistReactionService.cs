using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Reactions;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;

namespace Perflow.Services.Implementations
{
    public class ArtistReactionService : BaseService
    {
        private readonly IImageService _imageService;

        public ArtistReactionService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<ICollection<ArtistReadDTO>> GetArtistsByUserId(int userId)
        {
            var artists = await context.ArtistReactions
                .Where(r => r.UserId == userId)
                .Select(r =>
                    mapper.Map<UserWithIcon, ArtistReadDTO>(new UserWithIcon(r.Artist, _imageService.GetImageUrl(r.Artist.IconURL)))
                )
                .ToListAsync();

            return artists;
        }

        public async Task AddArtistReaction(NewArtistReactionDTO reaction)
        {
            if (reaction == null)
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");

            var reactions = context.ArtistReactions.Where(x =>
                x.UserId == reaction.UserId && x.ArtistId == reaction.ArtistId);

            if (reactions.Any())
            {
                throw new ArgumentException("Reaction already exists");
            }

            var artistReaction = new ArtistReaction()
            {
                ArtistId = reaction.ArtistId,
                UserId = reaction.UserId
            };

            await context.ArtistReactions.AddAsync(artistReaction);

            await context.SaveChangesAsync();
        }

        public async Task RemoveArtistReaction(NewArtistReactionDTO reaction)
        {
            if (reaction == null)
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");

            var reactions = context.ArtistReactions.Where(x =>
                x.UserId == reaction.UserId && x.ArtistId == reaction.ArtistId);

            if (!reactions.Any())
            {
                throw new ArgumentException("Reaction already exists");
            }

            context.ArtistReactions.RemoveRange(reactions);

            await context.SaveChangesAsync();

        }
    }
}

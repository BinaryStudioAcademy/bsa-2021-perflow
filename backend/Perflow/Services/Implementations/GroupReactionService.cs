using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Reactions;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class GroupReactionService : BaseService
    {
        private readonly IImageService _imageService;
        public GroupReactionService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task AddGroupReactionAsync(NewGroupReactionDTO reaction)
        {
            if (reaction == null)
            {
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");
            }

            var isReactionExist = context.GroupReactions
                .Any(r => r.UserId == reaction.UserId && r.GroupId == reaction.GroupId);

            if (isReactionExist)
            {
                throw new ArgumentException("Reaction already exists");
            }

            var groupReaction = new GroupReaction()
            {
                GroupId = reaction.GroupId,
                UserId = reaction.UserId
            };

            await context.GroupReactions.AddAsync(groupReaction);

            await context.SaveChangesAsync();
        }

        public async Task<ICollection<ArtistReadDTO>> GetGroupsByUserId(int userId)
        {
            var artists = await context.GroupReactions
                .Where(r => r.UserId == userId)
                .Select(r =>
                    mapper.Map<GroupWithIcon, ArtistReadDTO>(new GroupWithIcon(r.Group, _imageService.GetImageUrl(r.Group.IconURL)))
                )
                .ToListAsync();

            return artists;
        }

        public async Task RemoveGroupReactionAsync(NewGroupReactionDTO reaction)
        {
            if (reaction == null)
            {
                throw new ArgumentNullException(nameof(reaction), "Argument cannot be null");
            }

            var existingReaction = context.GroupReactions
                .FirstOrDefault(r => r.UserId == reaction.UserId && r.GroupId == reaction.GroupId);

            if (existingReaction == null)
            {
                throw new ArgumentException("Reaction doesn't exist");
            }

            context.GroupReactions.Remove(existingReaction);

            await context.SaveChangesAsync();
        }
    }
}

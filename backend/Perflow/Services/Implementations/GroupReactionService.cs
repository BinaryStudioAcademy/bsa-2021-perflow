using AutoMapper;
using Perflow.Common.DTO.Reactions;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class GroupReactionService : BaseService
    {
        public GroupReactionService(PerflowContext context, IMapper mapper) : base(context, mapper) { }

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

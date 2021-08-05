using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Perflow.Common.DTO.Reactions;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;


namespace Perflow.Services
{
    public class SongReactionService : BaseService
    {
        public SongReactionService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task LikeSong(NewSongReactionDTO songReactionDto)
        {
            if (songReactionDto == null)
                throw new ArgumentNullException(nameof(songReactionDto), "Argument cannot be null");

            var likes = context.SongReactions.Where(x =>
                x.UserId == songReactionDto.UserId && x.SongId == songReactionDto.SongId);

            if (!likes.Any())
            {
                var songReaction = new SongReaction()
                {
                    SongId = songReactionDto.SongId,
                    UserId = songReactionDto.UserId
                };

                await context.SongReactions.AddAsync(songReaction);

                await context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Reaction already exists");
            }
        }

        public async Task RemoveLikeSong(NewSongReactionDTO songReactionDto)
        {
            if (songReactionDto == null)
                throw new ArgumentNullException(nameof(songReactionDto), "Argument cannot be null");

            var likes = context.SongReactions.Where(x =>
                x.UserId == songReactionDto.UserId && x.SongId == songReactionDto.SongId);

            if (likes.Any())
            {
                context.SongReactions.RemoveRange(likes);
                await context.SaveChangesAsync();
            }
            else
            {
                throw new ArgumentException("Reaction does not exist");
            }
        }
    }
}

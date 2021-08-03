using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Playlist;
using Perflow.Common.DTO.Reactions;
using Perflow.Common.DTO.Song;
using Perflow.Common.DTO.User;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;

namespace Perflow.Services
{
    public class SongReactionService : BaseService
    {
        public SongReactionService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<bool> LikeSong(NewSongReactionDTO songReactionDto)
        {
            if (songReactionDto == null)
                throw new ArgumentNullException("Argument cannot be null");

            try
            {
                var likes = _context.SongReactions.Where(x =>
                    x.UserId == songReactionDto.UserId && x.SongId == songReactionDto.SongId);

                if (likes.Any())
                {
                    _context.SongReactions.RemoveRange(likes);
                    await _context.SaveChangesAsync();

                    return false;
                }

                var songReaction = new SongReaction(){SongId = songReactionDto.SongId, UserId = songReactionDto.UserId};

                await _context.SongReactions.AddAsync(songReaction);

                await _context.SaveChangesAsync();

                return true;
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}

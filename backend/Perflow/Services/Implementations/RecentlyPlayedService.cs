using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.RecentlyPlayed;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class RecentlyPlayedService : BaseService
    {
        private const int maxNumberOfStoredSongsPerUser = 100;
        public RecentlyPlayedService(PerflowContext context, IMapper mapper) : base(context, mapper)
        { }

        public async Task AddSong(RecentlyPlayedDTO rpInfo)
        {
            var rpList = context.RecentlyPlayed.Where(rp => rp.UserId == rpInfo.UserId);

            var rpUpdate = rpList.Where(rp => rp.ArtistId == rpInfo.ArtistId &&
                                              rp.AlbumId == rpInfo.AlbumId &&
                                              rp.PlaylistId == rpInfo.PlaylistId &&
                                              rp.SongId == rpInfo.SongId)
                                 .FirstOrDefault();

            if(rpUpdate == null)
            {
                if (rpList.Count() >= maxNumberOfStoredSongsPerUser)
                {
                    var rpRemove = rpList
                                    .OrderByDescending(rp => rp.LastTimeListened)
                                    .Last();
                    context.RecentlyPlayed.Remove(rpRemove);
                }

                var newRp = mapper.Map<RecentlyPlayed>(rpInfo);
                await context.RecentlyPlayed.AddAsync(newRp);
            }
            else
            {
                rpUpdate.Frequency++;
                rpUpdate.LastTimeListened = DateTime.Now;
                context.Entry(rpUpdate).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RecentlyPlayedDTO>> GetAll(int userId)
        {
            var rpList = await context.RecentlyPlayed
                                .Where(rp => rp.UserId == userId)
                                .ToListAsync();

            return mapper.Map<IEnumerable<RecentlyPlayedDTO>>(rpList);
        }

        public async Task<IEnumerable<RecentlyPlayedDTO>> GetRecent(int userId, int amount)
        {
            var rpList = await context.RecentlyPlayed
                                .Where(rp => rp.UserId == userId)
                                .OrderByDescending(rp => rp.LastTimeListened)
                                .Take(amount)
                                .ToListAsync();

            return mapper.Map<IEnumerable<RecentlyPlayedDTO>>(rpList);
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Songs;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;

namespace Perflow.Services.Implementations
{
    public class SongsService : BaseService, ISongsService
    {
        public SongsService(PerflowContext context, IMapper mapper) : base(context, mapper) { }

        public async Task<IEnumerable<SongReadDTO>> GetLikedSongsAsync(int userId)
        {
            var songs = await context.SongReactions
                .Where(songReaction => songReaction.UserId == userId)
                .Include(songReaction => songReaction.Song)
                    .ThenInclude(song => song.Artist)
                .Include(songReaction => songReaction.Song)
                    .ThenInclude(song => song.Group)
                .Include(songReaction => songReaction.Song)
                    .ThenInclude(song => song.Album)
                .Select(songReaction => songReaction.Song)
                .ToListAsync();

            return mapper.Map<IEnumerable<SongReadDTO>>(songs);
        }

        public async Task<IEnumerable<SongReadDTO>> FindSongsByNameAsync(string searchTerm)
        {
            var songs = await context.Songs
                .Where(song => song.Name.Contains(searchTerm.Trim()))
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<IEnumerable<SongReadDTO>>(songs);
        }

        public async Task<IEnumerable<SongReadDTO>> GetTopSongsByAuthorIdAsync(int id, int count)
        {
            var songs = await context.Songs
                .Where(song => song.ArtistId == id || song.GroupId == id)
                .OrderByDescending(song => song.Reactions.Count)
                .Take(count)
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<IEnumerable<SongReadDTO>>(songs);
        }
    }
}

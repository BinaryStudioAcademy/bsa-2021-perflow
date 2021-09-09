using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Songs;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class RadioService : BaseService, IRadioService
    {
        private readonly IImageService _imageService;
        private const int numberOfSongs = 20;

        public RadioService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<IEnumerable<SongLikedDTO>> GetRadioByPlaylistIdAsync(int playlistId, int userId)
        {
            var playlistTags = context.Playlists
                .Where(p => p.Id == playlistId)
                .Include(p => p.Songs)
                    .ThenInclude(ps => ps.Song.Tags)
                .AsNoTracking()
                .SelectMany(p => p.Songs)
                .SelectMany(s => s.Song.Tags)
                .Select(st => st.Tag)
                .ToHashSet();

            return mapper.Map<IEnumerable<SongLikedDTO>>(await GetSimilarSongsAsync(playlistTags, userId));
        }

        public async Task<IEnumerable<SongLikedDTO>> GetRadioBySongIdAsync(int songId, int userId)
        {
            var songTags = context.Songs
                .Where(s => s.Id == songId)
                .Include(s => s.Tags)
                .AsNoTracking()
                .SelectMany(s => s.Tags)
                .Select(st => st.Tag)
                .ToHashSet();

            return mapper.Map<IEnumerable<SongLikedDTO>>(await GetSimilarSongsAsync(songTags, userId));
        }

        private async Task<IEnumerable<SongLikedDTO>> GetSimilarSongsAsync(ICollection<Tag> tags, int userId, int numberOfSongs = numberOfSongs)
        {
            var songs = await context.SongTags
                .Where(st => tags.Contains(st.Tag))
                .Include(st => st.Song.Album)
                .Include(st => st.Song.Artist)
                .Include(st => st.Song.Group)
                .Include(st => st.Song.Reactions)
                .Include(st => st.Tag)
                .AsNoTracking()
                .AsSplitQuery()
                .ToListAsync();

            return songs
                .GroupBy(st => st.Song, st => st.Tag)
                .OrderByDescending(g => tags.Intersect(g).Count())
                .Take(numberOfSongs)
                .Select(g =>
                    mapper.Map<SongLikedDTO>(new LikedSong(
                        g.Key,
                        _imageService.GetImageUrl(g.Key.Album.IconURL),
                        g.Key.Reactions.Any(r => r.UserId == userId)))
                 )
                .ToList();
        }
    }
}

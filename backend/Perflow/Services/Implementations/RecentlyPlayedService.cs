using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.RecentlyPlayed;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
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
    public class RecentlyPlayedService : BaseService
    {
        private readonly IImageService _imageService;
        private const int maxNumberOfStoredSongsPerUser = 100;

        public RecentlyPlayedService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task AddSong(RecentlyPlayedDTO rpInfo)
        {
            var rpList = context.RecentlyPlayed.Where(rp => rp.UserId == rpInfo.UserId);

            var rpUpdate = rpList.FirstOrDefault(rp => rp.ArtistId == rpInfo.ArtistId &&
                                                       rp.AlbumId == rpInfo.AlbumId &&
                                                       rp.PlaylistId == rpInfo.PlaylistId &&
                                                       rp.SongId == rpInfo.SongId);

            if (rpList.Count() > maxNumberOfStoredSongsPerUser)
            {
                var rpRemove = rpList
                                .OrderByDescending(rp => rp.LastTimeListened)
                                .Last();
                context.RecentlyPlayed.Remove(rpRemove);
            }

            if (rpUpdate == null)
            {
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

        public async Task AddSongViaId(int songId, RPViaSongIdInfoDTO info)
        {
            var song = await context.Songs.SingleAsync(s => s.Id == songId);
            if(song == null)
                throw new ArgumentNullException(nameof(song), "Song was not found");

            var rpInfo = new RecentlyPlayedDTO
            {
                UserId = info.UserId,
                AlbumId = song.AlbumId,
                ArtistId = song.ArtistId,
                PlaylistId = info.PlaylistId,
                SongId = songId
            };

            await AddSong(rpInfo);
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

        public async Task<IEnumerable<RecentlyPlayedSongDTO>> GetRecentSongsAsync(int userId, int amount)
        {
            var songs = await context.RecentlyPlayed
                                .Where(rp => rp.UserId == userId)
                                .Include(rp => rp.Playlist)
                                .Include(rp => rp.Artist)
                                .Include(rp => rp.Song)
                                    .ThenInclude(s => s.Group)
                                .Include(rp => rp.Song)
                                    .ThenInclude(s => s.Album)
                                .OrderByDescending(rp => rp.LastTimeListened)
                                .Take(amount)
                                .Select(rp =>  new RecentlyPlayedSongDTO
                                {
                                    Id = rp.Song.Id,
                                    Name = rp.Song.Name,
                                    Album = new AlbumForPlaylistDTO
                                    { 
                                        Id = rp.Song.Album.Id,
                                        Name = rp.Song.Album.Name,
                                        IconURL = _imageService.GetImageUrl(rp.Song.Album.IconURL)
                                    },
                                    Group = mapper.Map<GroupForPlaylistDTO>(rp.Song.Group),
                                    Artist = mapper.Map<UserForPlaylistDTO>(rp.Artist),
                                    Playlist = mapper.Map<PlaylistNameDTO>(rp.Playlist)
                                })
                                .ToListAsync();
            return songs; 
        }
        public async Task<IEnumerable<RecentlyPlayedFrequencyDTO>> GetFrequencyRecentSongsAsync(int[] songIds)
        {
            var songs = await context.RecentlyPlayed
                                .Where(rp => songIds.Contains(rp.SongId))
                                .GroupBy(rp => rp.SongId)
                                .Select(rp => new RecentlyPlayedFrequencyDTO
                                {
                                    SongId = rp.Key,
                                    Frequency = rp.Sum(rp => rp.Frequency)
                                })
                                .ToListAsync();
            return songs;
        }
    }
}

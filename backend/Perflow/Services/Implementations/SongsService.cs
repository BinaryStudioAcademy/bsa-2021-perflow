using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Songs;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.AzureBlobStorage.Helpers;
using Perflow.Common.Helpers;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Users;
using Perflow.Common.DTO.Groups;

namespace Perflow.Services.Implementations
{
    public class SongsService : BaseService, ISongsService
    {
        private readonly IBlobService _blobService;
        private readonly IImageService _imageService;
        public SongsService(PerflowContext context, IMapper mapper, IBlobService blobService, IImageService imageService)
            : base(context, mapper)
        {
            _blobService = blobService;
            _imageService = imageService;
        }

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
                .Select(songReaction =>
                    mapper.Map<LikedSong, SongReadDTO>(new LikedSong(songReaction.Song, true))
                 )
                .ToListAsync();

            return songs;
        }

        public async Task<int> GetLikedSongsCountAsync(int userId)
        {
            var songs = await context.SongReactions
                .CountAsync(songReaction => songReaction.UserId == userId);
            return songs;
        }

        public async Task<IEnumerable<SongForPlaylistSongSearchDTO>> FindSongsByNameAsync(string searchTerm, int userId)
        {
            var songs = await context.Songs
                .Where(song => song.Name.Contains(searchTerm.Trim()))
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .Include(song => song.Reactions)
                .AsNoTracking()
                .Select(song => new SongForPlaylistSongSearchDTO
                {
                    Id = song.Id,
                    Album = mapper.Map<AlbumForPlaylistSongSearchDTO>(new AlbumWithIcon(song.Album, _imageService.GetImageUrl(song.Album.IconURL))),
                    Artist = mapper.Map<UserForPlaylistDTO>(song.Artist),
                    Group = mapper.Map<GroupForPlaylistDTO>(song.Group),
                    Duration = song.Duration,
                    HasCensorship = song.HasCensorship,
                    Name = song.Name,
                    IsLiked = song.Reactions.Any(r => r.UserId == userId)
                })
                .ToListAsync();

            return mapper.Map<IEnumerable<SongForPlaylistSongSearchDTO>>(songs);
        }

        public async Task<SongReadDTO> FindSongsByIdAsync(int id)
        {
            var song = await context.Songs
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .FirstOrDefaultAsync(song => song.Id == id);

            song.Album.IconURL = _imageService.GetImageUrl(song.Album.IconURL);

            return mapper.Map<SongReadDTO>(song);
        }

        public async Task<string> UploadSongAsync(IFormFile song)
        {
            var guid = Guid.NewGuid().ToString();

            if (song == null)
                throw new ArgumentNullException(nameof(song), "Argument cannot be null");

            if (!song.ContentType.StartsWith("audio"))
            {
                throw new ArgumentException("Format of file is incorrect");
            }

            await _blobService.UploadFileBlobAsync("songs", new BlobDto()
            {
                Content = song.OpenReadStream(),
                ContentType = song.ContentType,
                Guid = guid
            });

            return guid;
        }

        public async Task<SongReadDTO> AddSongInfoAsync(SongWriteDTO songInfo, int artistId)
        {
            if (songInfo == null)
                throw new ArgumentNullException(nameof(songInfo), "Argument cannot be null");

            songInfo.CreatedAt = DateTimeOffset.Now;
            songInfo.ArtistId = artistId;

            await context.Songs.AddAsync(mapper.Map<Song>(songInfo));

            await context.SaveChangesAsync();

            var result = await context.Songs
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.ArtistId == songInfo.ArtistId && s.Name == songInfo.Name);

            return mapper.Map<SongReadDTO>(result);
        }

        public async Task<FileContentResult> GetSongFileAsync(string blobId)
        {
            var blob = await _blobService.DownloadFileBlobAsync("songs", blobId);
            var file = await FileTransformer.BlobToByteArrayAsync(blob);

            return new FileContentResult(file, blob.ContentType);
        }

        public async Task RemoveSongAsync(int id)
        {
            var song = context.Songs.First(x => x.Id == id);

            if (song == null)
            {
                throw new ArgumentException("Song does not exist");
            }

            await _blobService.DeleteFileBlobAsync("songs", song.BlobId);

            context.Songs.Remove(song);

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SongReadDTO>> GetTopSongsByAuthorIdAsync(int id, int count, int userId)
        {
            var songs = await context.Songs
                .Where(song => song.ArtistId == id || song.GroupId == id)
                .OrderByDescending(song => song.Reactions.Count)
                .Take(count)
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .Select(s =>
                  mapper.Map<LikedSong, SongReadDTO>(new LikedSong(s, s.Reactions.Any(r => r.UserId == userId)))
                 )
                .ToListAsync();

            return songs;
        }

        public async Task<IEnumerable<SongReadDTO>> GetTopSongsByLikes(int amount)
        {
            var songs = await context.SongReactions
                                    .GroupBy(
                                        r => r.SongId,
                                        (key, group) => new { SongId = key, Count = group.Count() }
                                    )
                                    .OrderByDescending(group => group.Count)
                                    .Take(amount)
                                    .Join(
                                        context.Songs,
                                        group => group.SongId,
                                        song => song.Id,
                                        (group, song) => song
                                     )
                                    .Include(song => song.Album)
                                    .Include(song => song.Artist)
                                    .Include(song => song.Group)
                                    .AsNoTracking()
                                    .ToListAsync();

            return mapper.Map<IEnumerable<SongReadDTO>>(songs);
        }

        public async Task<bool> CheckIsLiked(int songId, int userId)
        {
            return await context.SongReactions.AnyAsync(sr => sr.SongId == songId && sr.UserId == userId);
        }

        public async Task Update(SongWriteDTO song)
        {
            var songForChange = (await context.Songs.FindAsync(song.Id));

            songForChange.Name = song.Name;
            songForChange.HasCensorship = song.HasCensorship;

            await Task.Run(() => context.Songs.Update(mapper.Map<Song>(songForChange)));

            await context.SaveChangesAsync();
        }

        public async Task UpdateOrders(SongOrderDTO[] songOrders)
        {
            foreach(var order in songOrders)
            {
                var song = await context.Songs.FindAsync(order.Id);
                song.Order = order.Order;
                context.Songs.Update(song);
            }

            await context.SaveChangesAsync();
        }
    }
}

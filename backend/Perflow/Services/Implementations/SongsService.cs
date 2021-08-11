using System;
using System.Collections.Generic;
using System.IO;
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

namespace Perflow.Services.Implementations
{
    public class SongsService : BaseService, ISongsService
    {
        private IBlobService _blobService;
        public SongsService(PerflowContext context, IMapper mapper, IBlobService blobService) : base(context, mapper)
        {
            _blobService = blobService;
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

        public async Task<SongReadDTO> FindSongsByIdAsync(int id)
        {
            var songs = await context.Songs
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .FirstOrDefaultAsync(song => song.Id == id);

            return mapper.Map<SongReadDTO>(songs);
        }

        public async Task UploadSongAsync(IFormFile song, int id)
        {
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
                Id = id
            });
        }

        public async Task<SongWriteDTO> AddSongInfoAsync(SongWriteDTO songInfo)
        {
            if (songInfo == null)
                throw new ArgumentNullException(nameof(songInfo), "Argument cannot be null");

            await context.Songs.AddAsync(mapper.Map<Song>(songInfo));

            await context.SaveChangesAsync();
            var result = await context.Songs.FirstOrDefaultAsync(s => s.ArtistId == songInfo.ArtistId && s.Name == songInfo.Name);

            return mapper.Map<SongWriteDTO>(result);
        }

        public async Task<FileContentResult> GetSongFileAsync(int id)
        {
            var blob = await _blobService.DownloadFileBlobAsync("songs", id);
            var file = await FileTransformer.BlobToByteArrayAsync(blob);

            return new FileContentResult(file, blob.ContentType);
        }

        public async Task RemoveSongInfoAsync(int id)
        {
            var songs = context.Songs.Where(x => x.Id == id);

            if (!songs.Any())
            {
                throw new ArgumentException("Song does not exist");
            }

            context.Songs.RemoveRange(songs);

            await context.SaveChangesAsync();
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

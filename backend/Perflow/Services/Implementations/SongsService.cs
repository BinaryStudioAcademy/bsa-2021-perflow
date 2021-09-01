﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Songs;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Perflow.Common.Helpers;
using Perflow.Domain.Enums;

namespace Perflow.Services.Implementations
{
    public class SongsService : BaseService, ISongsService
    {
        private readonly IImageService _imageService;

        public SongsService(PerflowContext context, IMapper mapper, IImageService imageService)
            : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<IEnumerable<SongLikedDTO>> GetLikedSongsAsync(int userId)
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
                    mapper.Map<SongLikedDTO>(new LikedSong(songReaction.Song, _imageService.GetImageUrl(songReaction.Song.Album.IconURL), true))
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

        public async Task<IEnumerable<SongForAlbumDTO>> GetTopSongsByAuthorIdAsync(int id, int count, AuthorType type, int userId)
        {
            var songs = await context.Songs
                .Where(song => type == AuthorType.Artist ? song.ArtistId == id : song.GroupId == id)
                .OrderByDescending(song => song.Reactions.Count)
                .Take(count)
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .AsNoTracking()
                .Select(s =>
                    mapper.Map<SongForAlbumDTO>(new LikedSong(s, _imageService.GetImageUrl(s.Album.IconURL), s.Reactions.Any(r => r.UserId == userId)))
                 )
                .ToListAsync();

            return songs;
        }

        public async Task<IEnumerable<SongForAlbumDTO>> GetSongsByAlbumIdAsync(int id, int userId)
        {
            return await context.Songs
                .Where(s => s.AlbumId == id)
                .OrderBy(s => s.Order)
                .Include(s => s.Artist)
                .Include(s => s.Group)
                .Include(s => s.Album)
                .AsNoTracking()
                .Select(s =>
                    mapper.Map<SongForAlbumDTO>(new LikedSong(s, _imageService.GetImageUrl(s.Album.IconURL), s.Reactions.Any(r => r.UserId == userId)))
                 )
                .ToListAsync();
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
    }
}

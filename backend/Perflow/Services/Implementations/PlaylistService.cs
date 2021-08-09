﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Songs;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;

namespace Perflow.Services.Implementations
{
    public class PlaylistService : BaseService
    {

        public PlaylistService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<ICollection<PlaylistDTO>> GetEntitiesAsync()
        {
            var entities = await context.Playlists.AsNoTracking().ToListAsync();

            return mapper.Map<ICollection<PlaylistDTO>>(entities);
        }

        public async Task<PlaylistDTO> GetEntityAsync(int id)
        {
            var entity = await context.Playlists
                .Include(p => p.Author)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            return mapper.Map<PlaylistDTO>(entity);
        }

        public async Task<PlaylistDTO> AddEntityAsync(PlaylistDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException(nameof(playlistDTO), "Argument cannot be null");

            playlistDTO.Id = 0;

            var playlist = mapper.Map<Playlist>(playlistDTO);

            var author = await context.Users.FirstOrDefaultAsync(user => user.Id == playlistDTO.Author.Id);
            playlist.Author = author;

            await context.Playlists.AddAsync(playlist);

            await context.SaveChangesAsync();

            var createdPlaylist = await GetEntityAsync(playlist.Id);

            return mapper.Map<PlaylistDTO>(createdPlaylist);
        }

        public async Task<PlaylistDTO> UpdateEntityAsync(PlaylistDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException(nameof(playlistDTO), "Argument cannot be null");

            var playlist = mapper.Map<Playlist>(playlistDTO);

            context.Entry(playlist).State = EntityState.Modified;

            await context.SaveChangesAsync();

            var updatedPlaylist = await GetEntityAsync(playlist.Id);

            return mapper.Map<PlaylistDTO>(updatedPlaylist);
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
            var deletedPlaylist = await context.Playlists.FirstOrDefaultAsync(p => p.Id == entityId);

            context.Playlists.Remove(deletedPlaylist);

            await context.SaveChangesAsync();

            return entityId;
        }

        public async Task<PlaylistSongDTO> AddSongAsync(PlaylistSongDTO playlistSongDTO)
        {
            var playlist = await context.Playlists
                .FirstOrDefaultAsync(playlist => playlist.Id == playlistSongDTO.PlaylistId);

            var song = await context.Songs
                .FirstOrDefaultAsync(song => song.Id == playlistSongDTO.SongId);

            var playlistSong = new PlaylistSong {
                Playlist = playlist,
                Song = song
            };

            await context.PlaylistSong.AddAsync(playlistSong);

            await context.SaveChangesAsync();

            return playlistSongDTO;
        }

        public async Task<PlaylistSongDTO> DeleteSongAsync(PlaylistSongDTO playlistSongDTO)
        {
            var playlistSong = await context.PlaylistSong
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistSongDTO.PlaylistId && p.SongId == playlistSongDTO.SongId);

            context.Entry(playlistSong).State = EntityState.Deleted;

            await context.SaveChangesAsync();

            return playlistSongDTO;
        }

        public async Task<ICollection<SongReadDTO>> GetSongsAsync(int id)
        {
            var songs = await context.PlaylistSong
                .Where(ps => ps.PlaylistId == id)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Album)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Artist)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Group)
                .Select(ps => ps.Song)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<SongReadDTO>>(songs);
        }
    }
}

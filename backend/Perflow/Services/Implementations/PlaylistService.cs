﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Songs;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Common.Helpers;
using Shared.ExceptionsHandler.Exceptions;
using Perflow.Common.DTO.Users;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;

namespace Perflow.Services.Implementations
{
    public class PlaylistService : BaseService
    {

        public PlaylistService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<PlaylistDTO> GetEntityAsync(int id)
        {
            var entity = await context.Playlists
                .Include(p => p.Author)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            return mapper.Map<PlaylistDTO>(entity);
        }

        public async Task<ICollection<PlaylistNameDTO>> GetCreatedPlaylistsAsync(int userId)
        {
            var entities = await context.Playlists
                                            .Include((pl) => pl.Author)
                                            .AsNoTracking()
                                            .Where(pl => pl.Author.Id == userId)
                                            .ToListAsync();

            return mapper.Map<ICollection<PlaylistNameDTO>>(entities);
        }

        public async Task<PlaylistDTO> GetLikedPlaylistAsync(int id, int userId)
        {
            var playlist = await context.Playlists
                .Include(p => p.Author)
                .AsNoTracking()
                .Select(p => new PlaylistDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    IconURL = p.IconURL,
                    AccessType = (AccessTypeDTO)p.AccessType,
                    CreatedAt = p.CreatedAt,
                    Description = p.Description,
                    Author = mapper.Map<UserForPlaylistDTO>(p.Author),
                    IsLiked = p.Reactions.Any(r => r.UserId == userId)
                })
                .FirstOrDefaultAsync(p => p.Id == id);

            if (playlist == null)
            {
                throw new NotFoundExcepion($"{nameof(Playlist)} not found");
            }

            return playlist;
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

        public async Task AddSongAsync(PlaylistSongDTO playlistSongDTO)
        {
            var playlist = await context.Playlists
                .FirstOrDefaultAsync(playlist => playlist.Id == playlistSongDTO.PlaylistId);

            var song = await context.Songs
                .FirstOrDefaultAsync(song => song.Id == playlistSongDTO.SongId);

            var playlistSong = new PlaylistSong
            {
                Playlist = playlist,
                Song = song
            };

            await context.PlaylistSong.AddAsync(playlistSong);

            await context.SaveChangesAsync();
        }

        public async Task<PlaylistSongDTO> DeleteSongAsync(PlaylistSongDTO playlistSongDTO)
        {
            var playlistSong = await context.PlaylistSong
                .FirstOrDefaultAsync(p => p.PlaylistId == playlistSongDTO.PlaylistId && p.SongId == playlistSongDTO.SongId);

            context.Entry(playlistSong).State = EntityState.Deleted;

            await context.SaveChangesAsync();

            return playlistSongDTO;
        }

        public async Task<ICollection<SongForPlaylistDTO>> GetSongsAsync(int id, int userId)
        {
            var songs = await context.PlaylistSong
                .Where(ps => ps.PlaylistId == id)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Album)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Artist)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Group)
                .Include(ps => ps.Song)
                    .ThenInclude(s => s.Reactions)
                .AsNoTracking()
                .Select(ps => new SongForPlaylistDTO
                {
                    Id = ps.Song.Id,
                    Album = mapper.Map<AlbumForPlaylistDTO>(ps.Song.Album),
                    Group = mapper.Map<GroupForPlaylistDTO>(ps.Song.Group),
                    Artist = mapper.Map<UserForPlaylistDTO>(ps.Song.Artist),
                    Duration = ps.Song.Duration,
                    HasCensorship = ps.Song.HasCensorship,
                    Name = ps.Song.Name,
                    IsLiked = ps.Song.Reactions.Any(r => r.UserId == userId),
                    CreatedAt = ps.Song.CreatedAt                    
                })
                .ToListAsync();

            return songs;
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetPlaylistsByAuthorIdAsync(int authorId)
        {
            var playlists = await context.Playlists
                .Where(p => p.AuthorId == authorId)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<IEnumerable<PlaylistViewDTO>>(playlists);
        }
    }
}

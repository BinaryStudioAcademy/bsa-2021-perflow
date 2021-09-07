using System;
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
using Shared.ExceptionsHandler.Exceptions;
using Perflow.Common.DTO.Users;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Services.Interfaces;
using Perflow.Common.Helpers;
using Perflow.Domain.Enums;

namespace Perflow.Services.Implementations
{
    public class PlaylistService : BaseService
    {
        private readonly IImageService _imageService;
        private const int numberOfDaysToStoreMix = 7;
        private const int numberOfDaysToStoreRecommendations = 7;
        private const int numberOfUserMixes = 3;
        private const int maxNumberOfRecommendations = 4;
        private const int numberOfSongs = 8;
        private const int numberOfRecommendationSongs = 20;

        public PlaylistService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<PlaylistDTO> GetEntityAsync(int id)
        {
            var entity = await context.Playlists
                .Include(p => p.Author)
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            return mapper.Map<PlaylistDTO>(entity);
        }

        public async Task<bool> CheckSongInPlaylistAsync(PlaylistSongDTO dto)
        {
            var song = await context.PlaylistSong
                .FirstOrDefaultAsync(ps => ps.PlaylistId == dto.PlaylistId && ps.SongId == dto.SongId);

            return song != null;
        }

        public async Task<ICollection<PlaylistNameDTO>> GetCreatedPlaylistsAsync(int userId)
        {
            var entities = await context.Playlists
                                            .Include((pl) => pl.Author)
                                            .AsNoTracking()
                                            .Where(pl => pl.Author.Id == userId && pl.Type == PlaylistType.Playlist)
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
                    IconURL = _imageService.GetImageUrl(p.IconURL),
                    AccessType = (AccessTypeDTO)p.AccessType,
                    CreatedAt = p.CreatedAt,
                    Description = p.Description,
                    Author = mapper.Map<UserForPlaylistDTO>(p.Author),
                    Type = p.Type,
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

        public async Task<PlaylistDTO> UpdateEntityAsync(PlaylistWriteDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException(nameof(playlistDTO), "Argument cannot be null");

            var playlist = await context.Playlists.FindAsync(playlistDTO.Id);

            if (playlistDTO.Icon != null)
            {
                var oldImageId = playlist.IconURL;

                playlist.IconURL = await _imageService.UploadImageAsync(playlistDTO.Icon);

                _ = _imageService.DeleteImageAsync(oldImageId);
            }

            var updatedPlaylist = mapper.Map(playlistDTO, playlist);

            context.Playlists.Update(updatedPlaylist);

            await context.SaveChangesAsync();

            return mapper.Map<PlaylistDTO>(new PlaylistWithIcon(updatedPlaylist, _imageService.GetImageUrl(updatedPlaylist.IconURL)));
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
            var deletedPlaylist = await context.Playlists
                .Include(p => p.Reactions)
                .FirstOrDefaultAsync(p => p.Id == entityId);

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
                    Album = mapper.Map<AlbumForPlaylistDTO>(new AlbumWithIcon(ps.Song.Album, _imageService.GetImageUrl(ps.Song.Album.IconURL))),
                    Group = mapper.Map<GroupForPlaylistDTO>(ps.Song.Group),
                    Artist = mapper.Map<UserForPlaylistDTO>(ps.Song.Artist),
                    Duration = ps.Song.Duration,
                    HasCensorship = ps.Song.HasCensorship,
                    Name = ps.Song.Name,
                    CreatedAt = ps.Song.CreatedAt,
                    IsLiked = ps.Song.Reactions.Any(r => r.UserId == userId)
                })
                .ToListAsync();

            return songs;
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetPlaylistsByAuthorIdAsync(int authorId)
        {
            var playlists = await context.Playlists
                .Where(p => p.AuthorId == authorId && p.Type == PlaylistType.Playlist)
                .Select(
                    p => mapper.Map<PlaylistViewDTO>(new PlaylistWithIcon(p, _imageService.GetImageUrl(p.IconURL)))
                 )
                .ToListAsync();

            return playlists;
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetPlaylistsByGroupIdAsync(int groupId)
        {
            var groupUsers = await context.Groups
                .Where(g => g.Id == groupId)
                .SelectMany(g => g.Artists)
                    .Include(a => a.Artist)
                .Select(a => a.ArtistId)
                .ToListAsync();

            var playlists = await context.Playlists
                .Where(p => groupUsers.Contains(p.AuthorId) && p.Type == PlaylistType.Playlist)
                .Select(
                    p => mapper.Map<PlaylistViewDTO>(new PlaylistWithIcon(p, _imageService.GetImageUrl(p.IconURL)))
                 )
                .ToListAsync();

            return playlists;
        }

        public async Task EditPlaylistNameAsync(PlaylistNameDTO playlistNameDTO)
        {
            if (playlistNameDTO == null)
                throw new ArgumentNullException(nameof(playlistNameDTO), "Argument cannot be null");

            var playlist = await context.Playlists.FindAsync(playlistNameDTO.Id);
            playlist.Name = playlistNameDTO.Name;

            context.Playlists.Update(playlist);

            await context.SaveChangesAsync();
        }

        public async Task<PlaylistNameDTO> CopyPlaylistAsync(PlaylistNameDTO playlistNameDTO)
        {
            if (playlistNameDTO == null)
                throw new ArgumentNullException(nameof(playlistNameDTO), "Argument cannot be null");

            var playlist = await context.Playlists
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == playlistNameDTO.Id);

            playlist.Id = 0;
            playlist.Name = $"copy-{playlist.Name}";

            await context.Playlists.AddAsync(playlist);
            await context.SaveChangesAsync();

            var songs = await context.PlaylistSong
                .Where(ps => ps.PlaylistId == playlistNameDTO.Id)
                .AsNoTracking()
                .ToListAsync();

            songs.ForEach(p =>
            {
                p.PlaylistId = playlist.Id;
                p.Id = 0;
            });

            await context.PlaylistSong.AddRangeAsync(songs);
            await context.SaveChangesAsync();

            return new PlaylistNameDTO { Id = playlist.Id, Name = playlist.Name };
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetUserMixAsync(int userId)
        {
            var mixes = await context.Playlists
                .Where(p => p.AuthorId == userId && p.Type == PlaylistType.Mix
                            && p.CreatedAt > DateTimeOffset.Now.AddDays(-numberOfDaysToStoreMix))
                .ToListAsync();

            await DeleteOlderThanAsync(numberOfDaysToStoreMix, PlaylistType.Mix);

            if (mixes.Count == 0)
            {
                mixes = await CreateUserMixesAsync(userId);
            }

            return mapper.Map<IEnumerable<PlaylistViewDTO>>(mixes);
        }

        public async Task<IEnumerable<PlaylistViewDTO>> GetRecommendationsAsync(int userId)
        {
            var recommendations = await context.Playlists
                .Where(p => p.AuthorId == userId
                       && p.Type == PlaylistType.Recommendations
                       && p.CreatedAt > DateTimeOffset.Now.AddDays(-numberOfDaysToStoreRecommendations))
                .ToListAsync();

            await DeleteOlderThanAsync(numberOfDaysToStoreRecommendations, PlaylistType.Recommendations);

            if (recommendations.Count == 0)
            {
                recommendations = await CreateRecommendationsAsync(userId);
            }

            return mapper.Map<IEnumerable<PlaylistViewDTO>>(recommendations);
        }

        private async Task<List<Playlist>> CreateRecommendationsAsync(int userId)
        {
            var numberOfRecentlyPlayedSongs = 50;
            var songs = await GetRecentlyPlayedSongsWithTagsAsync(userId, numberOfRecentlyPlayedSongs);
            var tags = GetRecentlyPlayedTags(songs, TagType.MusicStyle);

            if (tags.Count == 0)
            {
                return new List<Playlist>();
            }

            var recommendations = await CreateRecommendationPlaylistsAsync(userId, tags);

            foreach (var recommendation in recommendations.ToList())
            {
                var result = await AddSongsToRecommendationAsync(recommendation, recommendation.Name, songs);

                if (result == 0)
                {
                    recommendations.Remove(recommendation);
                    context.Playlists.Remove(recommendation);
                    await context.SaveChangesAsync();
                }
            }

            return recommendations;
        }

        private async Task<List<Playlist>> CreateRecommendationPlaylistsAsync(int userId, ICollection<string> tags)
        {
            var recommendations = new List<Playlist>(tags.Count);

            foreach (var tag in tags)
            {
                var recommendation = context.Playlists.Add(new Playlist
                {
                    Description = "Tracks in the recommendation especially for you.",
                    Name = tag,
                    AccessType = AccessType.Secret,
                    AuthorId = userId,
                    Type = PlaylistType.Recommendations
                });

                recommendations.Add(recommendation.Entity);
            }

            await context.SaveChangesAsync();

            return recommendations;
        }

        private async Task<int> AddSongsToRecommendationAsync(Playlist recommendation, string tagName, ICollection<Song> excludingSongs)
        {
            var songs = await GetSongsByTagAsync(tagName, excludingSongs);

            if (songs.Count == 0)
            {
                return 0;
            }

            var playlistSongs = songs.Select(s => new PlaylistSong
            {
                PlaylistId = recommendation.Id,
                SongId = s.Id
            });

            await context.PlaylistSong.AddRangeAsync(playlistSongs);

            return await context.SaveChangesAsync();
        }

        private async Task<ICollection<Song>> GetSongsByTagAsync(string tagName, ICollection<Song> songs = null, int numberOfSongs = numberOfRecommendationSongs)
        {
            return await context.SongTags
                .Where(st => songs != null ? !songs.Contains(st.Song) && st.Tag.Name == tagName : st.Tag.Name == tagName)
                .AsNoTracking()
                .Take(numberOfSongs)
                .Select(st => st.Song)
                .ToListAsync();
        }

        private ICollection<string> GetRecentlyPlayedTags(ICollection<Song> songs, TagType type, int amount = maxNumberOfRecommendations)
        {
            return songs
                .SelectMany(s => s.Tags)
                .Select(st => st.Tag)
                .Where(t => t.Type == type)
                .GroupBy(t => t.Name)
                .OrderByDescending(g => g.Count())
                .Take(amount)
                .Select(g => g.Key)
                .ToList();
        }

        private async Task<List<Playlist>> CreateUserMixesAsync(int userId, int amount = numberOfUserMixes)
        {
            var mixes = new List<Playlist>(amount);

            for (int i = 1; i <= amount; i++)
            {
                var mix = await context.Playlists.AddAsync(new Playlist
                {
                    Description = "Tracks in the mix especially for you.",
                    Name = $"Mix #{i}",
                    AccessType = AccessType.Secret,
                    AuthorId = userId,
                    Type = PlaylistType.Mix
                });

                mixes.Add(mix.Entity);
            }

            await context.SaveChangesAsync();

            foreach (var mix in mixes.ToList())
            {
                var result = await AddSongsToMixAsync(mix);

                if (result == 0)
                {
                    mixes.Remove(mix);
                    context.Playlists.Remove(mix);
                    await context.SaveChangesAsync();
                }
            }

            return mixes;
        }

        private async Task<int> AddSongsToMixAsync(Playlist mix)
        {
            var artistsSongs = await GetRandomLikedArtistsSongsAsync(mix.AuthorId);
            var groupSongs = await GetRandomLikedGroupsSongsAsync(mix.AuthorId);
            var recentlyPlayed = await GetRecentlyPlayedSongsAsync(mix.AuthorId);
            var likedSongs = await GetRandomLikedSongsAsync(mix.AuthorId);

            var songs = artistsSongs.Concat(groupSongs).Concat(recentlyPlayed).Concat(likedSongs)
                .Distinct()
                .Select(s => new PlaylistSong
                {
                    PlaylistId = mix.Id,
                    SongId = s.Id
                });

            if (!songs.Any())
            {
                return 0;
            }

            await context.PlaylistSong.AddRangeAsync(songs);

            return await context.SaveChangesAsync();
        }

        private async Task<ICollection<Song>> GetRandomLikedArtistsSongsAsync(int userId, int numberOfSongs = numberOfSongs)
        {
            var numberOfArtists = 3;

            return await context.ArtistReactions
                .Where(ar => ar.UserId == userId)
                .Include(ar => ar.Artist)
                .ThenInclude(a => a.Albums)
                .ThenInclude(a => a.Songs)
                .AsNoTracking()
                .AsSplitQuery()
                .OrderBy(_ => Guid.NewGuid())
                .Take(numberOfArtists)
                .SelectMany(ar => ar.Artist.Albums)
                .SelectMany(a => a.Songs)
                .OrderBy(_ => Guid.NewGuid())
                .Take(numberOfSongs)
                .ToListAsync();
        }

        private async Task<ICollection<Song>> GetRandomLikedGroupsSongsAsync(int userId, int numberOfSongs = numberOfSongs)
        {
            var numberOfArtists = 3;

            return await context.GroupReactions
                .Where(gr => gr.UserId == userId)
                .Include(gr => gr.Group)
                .ThenInclude(g => g.Albums)
                .ThenInclude(a => a.Songs)
                .AsNoTracking()
                .AsSplitQuery()
                .OrderBy(_ => Guid.NewGuid())
                .Take(numberOfArtists)
                .SelectMany(gr => gr.Group.Albums)
                .SelectMany(a => a.Songs)
                .OrderBy(_ => Guid.NewGuid())
                .Take(numberOfSongs)
                .ToListAsync();
        }

        private async Task<ICollection<Song>> GetRecentlyPlayedSongsAsync(int userId, int numberOfSongs = numberOfSongs)
        {
            return await context.RecentlyPlayed
                    .Where(rp => rp.UserId == userId)
                    .AsNoTracking()
                    .OrderByDescending(rp => rp.LastTimeListened)
                    .Take(numberOfSongs)
                    .Select(rp => rp.Song)
                    .ToListAsync();
        }

        private async Task<ICollection<Song>> GetRecentlyPlayedSongsWithTagsAsync(int userId, int numberOfSongs = numberOfSongs)
        {
            return await context.RecentlyPlayed
                    .Include(rp => rp.Song)
                        .ThenInclude(s => s.Tags)
                            .ThenInclude(st => st.Tag)
                    .Where(rp => rp.UserId == userId)
                    .AsNoTracking()
                    .AsSplitQuery()
                    .OrderByDescending(rp => rp.LastTimeListened)
                    .Take(numberOfSongs)
                    .Select(rp => rp.Song)
                    .ToListAsync();
        }

        private async Task<ICollection<Song>> GetRandomLikedSongsAsync(int userId, int numberOfSongs = numberOfSongs)
        {
            return await context.SongReactions
                    .Where(sr => sr.UserId == userId)
                    .AsNoTracking()
                    .OrderBy(_ => Guid.NewGuid())
                    .Take(numberOfSongs)
                    .Select(sr => sr.Song)
                    .ToListAsync();
        }

        private async Task DeleteOlderThanAsync(int numberOfDays, PlaylistType type)
        {
            var date = DateTimeOffset.Now.AddDays(-numberOfDays);

            var oldPlaylists = context.Playlists
                .Where(p => p.CreatedAt < date && p.Type == type);

            context.Playlists.RemoveRange(oldPlaylists);

            await context.SaveChangesAsync();
        }
    }
}

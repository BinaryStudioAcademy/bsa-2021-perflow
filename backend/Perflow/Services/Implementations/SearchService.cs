using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.DataAccess.Context;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using Perflow.Services.Abstract;
using Shared.Auth;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Search;
using Perflow.Services.Interfaces;
using Perflow.Common.Helpers;
using System;
using Perflow.Domain.Enums;

namespace Perflow.Services.Implementations
{
    public class SearchService : BaseService
    {
        private readonly IImageService _imageService;

        public SearchService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<ICollection<SongForPlaylistSongSearchDTO>> FindSongsByNameAsync
            (string searchTerm, int page, int itemsOnPage, int userId)
        {
            int skip = (page - 1) * itemsOnPage;

            var songs = await context.Songs
                .Where(song => song.Name.Contains(searchTerm.Trim()))
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .Include(song => song.Reactions)
                .OrderByDescending(song => song.Reactions.GroupBy(r => r.UserId).Count())
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(song => new SongForPlaylistSongSearchDTO
                {
                    Id = song.Id,
                    Album = mapper.Map<AlbumForPlaylistSongSearchDTO>(
                        new AlbumWithIcon(song.Album, _imageService.GetImageUrl(song.Album.IconURL))),
                    Artist = mapper.Map<UserForPlaylistDTO>(song.Artist),
                    Group = mapper.Map<GroupForPlaylistDTO>(song.Group),
                    Duration = song.Duration,
                    HasCensorship = song.HasCensorship,
                    Name = song.Name,
                    IsLiked = song.Reactions.Any(r => r.UserId == userId)
                })
                .ToListAsync();

            return songs;
        }

        public async Task<ICollection<ArtistReadDTO>> FindArtistsByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            int skip = (page - 1) * itemsOnPage;

            var artists = await context.Users
                .Where(user => user.Role == UserRole.Artist && user.UserName.Contains(searchTerm.Trim()))
                .Include(user => user.Reactions)
                .OrderByDescending(user => user.Reactions.GroupBy(r => r.UserId).Count())
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(
                    u => mapper.Map<ArtistReadDTO>(new UserWithIcon(u, _imageService.GetImageUrl(u.IconURL)))
                 )
                .ToListAsync();

            return artists;
        }

        public async Task<ICollection<ArtistReadDTO>> FindUsersByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            int skip = (page - 1) * itemsOnPage;

            var artists = await context.Users
                .Where(user => user.UserName.Contains(searchTerm.Trim()))
                .Include(user => user.Reactions)
                .OrderByDescending(user => user.Reactions.GroupBy(r => r.UserId).Count())
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(
                    u => mapper.Map<ArtistReadDTO>(new UserWithIcon(u, _imageService.GetImageUrl(u.IconURL)))
                 )
                .ToListAsync();

            return artists;
        }

        public async Task<ICollection<GroupShortDTO>> FindGroupsByNameAsync(string searchTerm, int page, int itemsOnPage, int userId)
        {
            int skip = (page - 1) * itemsOnPage;

            var groups = await context.Groups
                .Include(g => g.Artists)
                .Where(g => g.Name.Contains(searchTerm.Trim()) 
                                && g.Artists.All(a => a.Artist.Id != userId)
                                && g.Approved == true)
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(
                    g => mapper.Map<GroupShortDTO>(new GroupWithIcon(g, _imageService.GetImageUrl(g.IconURL)))
                 )
                .ToListAsync();

            return groups;
        }

        public async Task<ICollection<AlbumForListDTO>> FindAlbumsByNameAsync
            (bool onlyPublished, string searchTerm, int page, int itemsOnPage)
        {
            int skip = (page - 1) * itemsOnPage;

            var albums = await context.Albums
                .Where(album => album.Name.Contains(searchTerm.Trim()) &&
                                (onlyPublished ? album.IsPublished : true))
                .Include(album => album.Author)
                .Include(album => album.Reactions)
                .Include(album => album.Group)
                .OrderByDescending(album => album.Reactions.GroupBy(r => r.UserId).Count())
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(album => new AlbumForListDTO
                {
                    Id = album.Id,
                    Name = album.Name,
                    ReleaseYear = album.ReleaseYear,
                    IconURL = _imageService.GetImageUrl(album.IconURL),
                    Author = album.AuthorId != null ? (new AlbumViewAuthorsDTO(album.Author.Id, album.Author.UserName, true))
                        : new AlbumViewAuthorsDTO(album.Group.Id, album.Group.Name, false)
                })
                .ToListAsync();

            return albums;
        }

        public async Task<ICollection<PlaylistViewDTO>> FindPlaylistsByNameAsync
            (string searchTerm, int page, int itemsOnPage)
        {
            int skip = (page - 1) * itemsOnPage;

            var playlists = await context.Playlists
                .Where(playlist => playlist.Name.Contains(searchTerm.Trim()) && playlist.Type == PlaylistType.Playlist)
                .Include(playlist => playlist.Reactions)
                .OrderByDescending(playlist => playlist.Reactions.GroupBy(r => r.UserId).Count())
                .Skip(skip)
                .Take(itemsOnPage)
                .AsNoTracking()
                .Select(
                    p => mapper.Map<PlaylistViewDTO>(new PlaylistWithIcon(p, _imageService.GetImageUrl(p.IconURL)))
                 )
                .ToListAsync();

            return playlists;
        }

        public async Task<SearchResultDTO> FindAllByNameAsync(string searchTerm, int userId)
        {
            int maxSongAmount = 4;
            int maxEntitiesAmount = 8;
            const int page = 1; // don't change

            var result = new SearchResultDTO
            {
                Songs = await FindSongsByNameAsync(searchTerm, page, maxSongAmount, userId),
                Albums = await FindAlbumsByNameAsync(true, searchTerm, page, maxEntitiesAmount),
                Artists = await FindArtistsByNameAsync(searchTerm, page, maxEntitiesAmount),
                Playlists = await FindPlaylistsByNameAsync(searchTerm, page, maxEntitiesAmount),
                Groups = await FindGroupsByNameAsync(searchTerm, page, maxSongAmount, userId)
            };

            return result;
        }
    }
}

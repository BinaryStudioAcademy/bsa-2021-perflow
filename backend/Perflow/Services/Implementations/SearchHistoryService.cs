using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Search;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
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
    public class SearchHistoryService : BaseService
    {
        private readonly IImageService _imageService;
        private const int maxNumberOfNotesPerUser = 8;

        public SearchHistoryService(PerflowContext context, IMapper mapper, IImageService imageService) 
            : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task AddSearchHistoryAsync(SearchHistoryWriteDTO historyDTO)
        {
            if (historyDTO == null)
                throw new ArgumentNullException("Argument cannot be null");


            var shList = await context.SearchHistory
                .Where(sh => sh.UserId == historyDTO.UserId)
                .ToListAsync();

            var shUpdate = shList.FirstOrDefault(
                rp => rp.ArtistId == historyDTO.ArtistId &&
                rp.GroupId == historyDTO.GroupId &&
                rp.AlbumId == historyDTO.AlbumId &&
                rp.PlaylistId == historyDTO.PlaylistId);

            if (shUpdate != null)
            {
                shUpdate.CreatedAt = DateTimeOffset.Now;
                context.Entry(shUpdate).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return;
            }

            if (shList.Count >= maxNumberOfNotesPerUser)
            {
                var shRemove = shList
                    .OrderByDescending(sh => sh.CreatedAt)
                    .Last();

                context.SearchHistory.Remove(shRemove);
            }

            var history = mapper.Map<SearchHistory>(historyDTO);

            if (historyDTO.AlbumId != null)
            {
                history.Album = await context.Albums
                   .FirstOrDefaultAsync(a => a.Id == historyDTO.AlbumId);
            }
            else if (historyDTO.ArtistId != null)
            {
                history.Artist = await context.Users
                   .FirstOrDefaultAsync(u => u.Id == historyDTO.ArtistId);
            }
            else if (historyDTO.GroupId != null)
            {
                history.Group = await context.Groups
                   .FirstOrDefaultAsync(g => g.Id == historyDTO.GroupId);
            }
            else
            {
                history.Playlist = await context.Playlists
                    .FirstOrDefaultAsync(p => p.Id == historyDTO.PlaylistId);
            }

            await context.SearchHistory.AddAsync(history);
            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<SearchHistoryReadDTO>> GetUserSearchHistory(int userId)
        {
            if (userId <= 0)
                throw new ArgumentNullException("Wrong user ID");

            var list = await context.SearchHistory
                .Where(sh => sh.UserId == userId)
                .Include(sh => sh.Album)
                    .ThenInclude(a => a.Author)
                .Include(sh => sh.Album)
                    .ThenInclude(a => a.Group)
                .Include(sh => sh.Artist)
                .Include(sh => sh.Playlist)
                .Include(sh => sh.Group)
                .OrderByDescending(sh => sh.CreatedAt)
                .AsNoTracking()
                .ToListAsync();

            var res = list.Select(sh => new SearchHistoryReadDTO
            {
                UserId = sh.UserId,
                Playlist = sh.PlaylistId != null ? new PlaylistViewDTO
                {
                    Id = sh.Playlist.Id,
                    Description = sh.Playlist.Description,
                    Name = sh.Playlist.Name,
                    IconURL = _imageService.GetImageUrl(sh.Playlist.IconURL)
                } : null,
                Album = sh.AlbumId != null ? new AlbumForListDTO
                {
                    Id = sh.Album.Id,
                    Name = sh.Album.Name,
                    ReleaseYear = sh.Album.ReleaseYear,
                    IconURL = _imageService.GetImageUrl(sh.Album.IconURL),
                    Author = sh.Album.AuthorId != null ? (new AlbumViewAuthorsDTO(sh.Album.Author.Id, sh.Album.Author.UserName, true))
                        : new AlbumViewAuthorsDTO(sh.Album.Group.Id, sh.Album.Group.Name, false)
                } : null,
                Artist = sh.ArtistId != null ? new ArtistReadDTO
                {
                    Id = sh.Artist.Id,
                    UserName = sh.Artist.UserName,
                    IconURL = _imageService.GetImageUrl(sh.Artist.IconURL),
                    IsArtist = true
                } : null,
                Group = sh.GroupId != null ? new GroupShortDTO
                {
                    Id = sh.Group.Id,
                    UserName = sh.Group.Name,
                    IconURL = _imageService.GetImageUrl(sh.Group.IconURL),
                    IsArtist = false
                } : null
            });

            return res;
        }
    }
}

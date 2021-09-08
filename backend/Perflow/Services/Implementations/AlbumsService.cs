using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Notifications;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class AlbumsService : BaseService
    {
        private readonly IImageService _imageService;
        private readonly INotificationService _notificationService;

        public AlbumsService(PerflowContext context, IMapper mapper, IImageService imageService, INotificationService notificationService)
            : base(context, mapper)
        {
            _imageService = imageService;
            _notificationService = notificationService;
        }

        public async Task<ICollection<AlbumViewDTO>> GetAllAlbums()
        {
            var entities = await context.Albums.AsNoTracking().ToListAsync();

            return mapper.Map<ICollection<AlbumViewDTO>>(entities);
        }

        public async Task<Album> GetEntityAsync(int id)
        {
            var entity = await context.Albums
                .Include(album => album.Author)
                .Include(album => album.Group)
                .AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

            return mapper.Map<Album>(entity);
        }

        public async Task<AlbumFullDTO> GetAlbumFullAsync(int id, int userId)
        {
            var album = await context.Albums.Include(a => a.Songs)
                                                .ThenInclude(s => s.Artist)
                                            .Include(a => a.Songs)
                                                .ThenInclude(s => s.Album)
                                            .Include(a => a.Songs)
                                                .ThenInclude(s => s.Group)
                                            .Include(a => a.Author)
                                            .Include(a => a.Group)
                                            .AsNoTracking()
                                            .Select(a => new AlbumFullDTO
                                            {
                                                Id = a.Id,
                                                Name = a.Name,
                                                ReleaseYear = a.ReleaseYear,
                                                IconURL = _imageService.GetImageUrl(a.IconURL),
                                                Songs = a.Songs.OrderBy(s => s.Order)
                                                .Select(s =>
                                                    mapper.Map<SongForAlbumDTO>(new LikedSong(
                                                        s,
                                                        _imageService.GetImageUrl(s.Album.IconURL),
                                                        s.Reactions.Any(r => r.UserId == userId)))
                                                ),
                                                Artist = mapper.Map<ArtistForAlbumDTO>(a.Author),
                                                Group = mapper.Map<GroupForAlbumDTO>(a.Group),
                                                IsLiked = a.Reactions.Any(r => r.UserId == userId),
                                                IsSingle = a.IsSingle,
                                                Region = a.Region,
                                                AuthorType = a.AuthorType,
                                                Description = a.Description,
                                                IsPublished = a.IsPublished
                                            })
                                            .FirstOrDefaultAsync(e => e.Id == id);

            if (album == null)
            {
                throw new NotFoundExcepion($"{nameof(Album)} not found");
            }

            return album;
        }

        public async Task<IEnumerable<AlbumShortDTO>> GetAlbumsByArtist(int artistId, AuthorType type)
        {
            var albums = await context.Albums
                                        .Where(a => type == AuthorType.Artist
                                                    ? a.AuthorId == artistId && a.IsPublished
                                                    : a.GroupId == artistId && a.IsPublished)
                                        .Include(a => a.Author)
                                        .Include(a => a.Group)
                                        .OrderByDescending(a => a.CreatedAt)
                                        .Select(a => new AlbumShortDTO
                                        {
                                            Id = a.Id,
                                            Name = a.Name,
                                            AuthorName = type == AuthorType.Artist ? a.Author.UserName : a.Group.Name,
                                            IconURL = _imageService.GetImageUrl(a.IconURL),
                                            ReleaseYear = a.ReleaseYear,
                                            IsSingle = a.IsSingle
                                        })
                                        .ToListAsync();

            return albums;
        }

        public async Task<IEnumerable<AlbumShortDTO>> GetAlbumsByArtistUnpublished(int groupId)
        {
            var albums = await context.Albums
                                        .Where(a => a.GroupId == groupId)
                                        .Include(a => a.Group)
                                        .OrderByDescending(a => a.CreatedAt)
                                        .Select(a => new AlbumShortDTO
                                        {
                                            Id = a.Id,
                                            Name = a.Name,
                                            AuthorName = a.Group.Name,
                                            IconURL = _imageService.GetImageUrl(a.IconURL),
                                            ReleaseYear = a.ReleaseYear,
                                            IsSingle = a.IsSingle
                                        })
                                        .ToListAsync();

            return albums;
        }

        public async Task<ICollection<AlbumForListDTO>> GetAlbumShortInfosByArtist(int artistId)
        {
            var albums = await context.Albums
                                        .Where(a => a.AuthorId == artistId || a.GroupId == artistId)
                                        .Include(a => a.Author)
                                        .Include(a => a.Group)
                                        .Select(a => new AlbumForListDTO
                                        {
                                            Id = a.Id,
                                            Name = a.Name,
                                            IconURL = _imageService.GetImageUrl(a.IconURL),
                                            Author = new AlbumViewAuthorsDTO(
                                            a.Author.Id,
                                            a.Author.UserName,
                                            a.Group == null),

                                        })
                                        .ToListAsync();

            return albums;
        }


        public async Task<IEnumerable<AlbumViewDTO>> GetNewReleases()
        {
            var firstDay = DateTime.Today.AddDays(-30);
            var newReleasesToTake = 20;
            var entities = await context.Albums
                .Include(a => a.Author)
                .Include(a => a.Group)
                .AsNoTracking()
                .Where(a => a.CreatedAt >= firstDay && a.IsPublished)
                .OrderByDescending(a => a.CreatedAt)
                .Take(newReleasesToTake)
                .Select(a => new AlbumViewDTO
                {
                    Id = a.Id,
                    Name = a.Name,
                    IconURL = _imageService.GetImageUrl(a.IconURL),
                    Author = a.AuthorId != null ? (new AlbumViewAuthorsDTO(a.Author.Id, a.Author.UserName, true))
                        : new AlbumViewAuthorsDTO(a.Group.Id, a.Group.Name, false)
                })
                .ToListAsync();

            return entities;
        }

        public async Task<AlbumEditDTO> AddEntityAsync(AlbumWriteDTO albumDTO)
        {
            if (albumDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            albumDTO.Id = 0;

            var album = mapper.Map<Album>(albumDTO);

            if (albumDTO.GroupId == null && albumDTO.AuthorId != null)
            {
                album.Author = await context.Users.FirstOrDefaultAsync(user => user.Id == albumDTO.AuthorId);
            }
            else
            {
                album.Group = await context.Groups.FirstOrDefaultAsync(group => group.Id == albumDTO.GroupId);
            }

            if (albumDTO.Icon != null)
            {
                album.IconURL = await _imageService.UploadImageAsync(albumDTO.Icon);
            }

            await context.Albums.AddAsync(album);

            await context.SaveChangesAsync();

            var createdAlbum = await context.Albums
                .Include(a => a.Author)
                .Include(a => a.Group)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == album.Id);

            return mapper.Map<AlbumEditDTO>(new AlbumWithIcon(createdAlbum, _imageService.GetImageUrl(createdAlbum.IconURL)));
        }

        public async Task<AlbumEditDTO> UpdateEntityAsync(AlbumWriteDTO albumDTO)
        {
            if (albumDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            var updatedAlbum = await GetEntityAsync(albumDTO.Id);

            var album = mapper.Map(albumDTO, updatedAlbum);

            if (albumDTO.GroupId == null && albumDTO.AuthorId != null)
            {
                album.Author = await context.Users.FirstOrDefaultAsync(u => u.Id == albumDTO.AuthorId);
            }
            else
            {
                album.Group = await context.Groups.FirstOrDefaultAsync(g => g.Id == albumDTO.GroupId);
            }

            if (albumDTO.Icon != null)
            {
                var oldImageId = album.IconURL;

                album.IconURL = await _imageService.UploadImageAsync(albumDTO.Icon);

                _ = _imageService.DeleteImageAsync(oldImageId);
            }

            context.Entry(album).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return mapper.Map<AlbumEditDTO>(new AlbumWithIcon(updatedAlbum, _imageService.GetImageUrl(updatedAlbum.IconURL)));
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
            var deletedAlbum = await context.Albums
                .Include(album => album.Songs)
                .FirstOrDefaultAsync(album => album.Id == entityId);

            var recentlyPlayed = context.RecentlyPlayed.Where(rp => rp.AlbumId == entityId);

            context.RecentlyPlayed.RemoveRange(recentlyPlayed);

            context.Albums.Remove(deletedAlbum);

            await context.SaveChangesAsync();

            return entityId;
        }

        public async Task SetPublicStatusAsync(AlbumPublicStatusDTO status)
        {
            if (status == null)
                throw new ArgumentNullException("Argument cannot be null");

            var album = await context.Albums
                .Include(a => a.Author)
                .Include(a => a.Group)
                .FirstOrDefaultAsync(album => album.Id == status.Id);

            album.IsPublished = status.IsPublished;

            context.Entry(album).State = EntityState.Modified;

            await context.SaveChangesAsync();

            if (status.IsPublished)
            {
                await SendNotificationAsync(album);
            }
        }

        public async Task<IEnumerable<AlbumForNewestFiveDTO>> GetFiveNewestAlbumsAsync(int userId)
        {
            var newAlbumsToTake = 5;

            IEnumerable<AlbumForNewestFiveDTO> entities = await context.Albums
                .Where(album => album.IsPublished)
                .Include(album => album.Reactions)
                .Include(album => album.Author)
                .OrderByDescending(a => a.CreatedAt)
                .Take(newAlbumsToTake)
                .AsNoTracking()
                .Select(album => new AlbumForNewestFiveDTO
                {
                    Id = album.Id,
                    Name = album.Name,
                    Description = album.Description,
                    IconURL = _imageService.GetImageUrl(album.IconURL),
                    IsLiked = album.Reactions.Any(ar => ar.UserId == userId),
                    ArtistId = album.Author != null ? album.Author.Id : (int?)null
                })
                .ToListAsync();

            return entities;
        }

        private async Task SendNotificationAsync(Album album)
        {
            var isArtist = album.AuthorType == AuthorType.Artist;

            var authorId = isArtist ? album.Author.Id : album.Group.Id;
            var authorName = isArtist ? album.Author.UserName : album.Group.Name;

            var notification = new NotificationWriteDTO
            {
                Title = "New Album",
                Description = $"{authorName} has released a new album!",
                Reference = album.Id,
                Type = isArtist ? NotificationType.ArtistSubscribtion : NotificationType.GroupSubscribtion
            };

            var notifications = await _notificationService.CreateSubscriberNotificationAsync(notification, authorId, album.AuthorType);
            await _notificationService.SendNotificationAsync(notifications);
        }
    }
}

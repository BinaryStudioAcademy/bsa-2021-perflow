using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Shared.ExceptionsHandler.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class AlbumsService : BaseService
    {
        public AlbumsService(PerflowContext context, IMapper mapper) : base(context, mapper)
        { }

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
                                                IconURL = a.IconURL,
                                                Songs = a.Songs
                                                .Select(s =>
                                                    mapper.Map<LikedSong, SongReadDTO>(new LikedSong(s, s.Reactions.Any(r => r.UserId == userId)))
                                                ),
                                                Artist = mapper.Map<User, ArtistForAlbumDTO>(a.Author),
                                                Group = mapper.Map<Group, GroupForAlbumDTO>(a.Group),
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

        public async Task<ICollection<AlbumReadDTO>> GetAlbumsByArtist(int artistId)
        {
            var albums = await context.Albums
                                        .Where(a => a.AuthorId == artistId || a.GroupId == artistId)
                                        .Include(a => a.Author)
                                        .Include(a => a.Group)
                                        .AsNoTracking()
                                        .ToListAsync();

            return mapper.Map<ICollection<AlbumReadDTO>>(albums);
        }

        public async Task<ICollection<AlbumViewDTO>> GetNewReleases()
        {
            var firstDay = DateTime.Today.AddDays(-30);
            var entities = await context.Albums
                .Include(a => a.Songs).ThenInclude(s => s.Artist)
                .Include(a => a.Songs).ThenInclude(s => s.Group)
                .AsNoTracking()
                .Where(a => a.CreatedAt >= firstDay && a.IsPublished)
                .OrderByDescending(a => a.CreatedAt)
                .Select(a => new AlbumViewDTO
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    IconURL = a.IconURL,
                    IsSingle = a.IsSingle,
                    Reactions = a.Reactions.Count,
                    Authors = a.Songs.Select((s) => s.AuthorType == Domain.Enums.AuthorType.Artist ? new AlbumViewAuthorsDTO(s.Artist.Id, s.Artist.UserName, true) : new AlbumViewAuthorsDTO(s.Group.Id, s.Group.Name, false)).ToList()
                })
                .ToListAsync();
            foreach (var entity in entities)
            {
                entity.Authors = entity.Authors.Distinct();
            }
            return entities;
        }

        public async Task<AlbumEditDTO> AddEntityAsync(AlbumEditDTO albumDTO)
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

            await context.Albums.AddAsync(album);

            await context.SaveChangesAsync();

            var createdAlbum = await context.Albums
                .Include(a => a.Author)
                .Include(a => a.Group)
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == album.Id);

            return mapper.Map<AlbumEditDTO>(createdAlbum);
        }

        public async Task<AlbumEditDTO> UpdateEntityAsync(AlbumEditDTO albumDTO)
        {
            if (albumDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            var album = mapper.Map<Album>(albumDTO);

            if (albumDTO.GroupId == null && albumDTO.AuthorId != null)
            {
                album.Author = await context.Users.FirstOrDefaultAsync(u => u.Id == albumDTO.AuthorId);
            }
            else
            {
                album.Group = await context.Groups.FirstOrDefaultAsync(g => g.Id == albumDTO.GroupId);
            }

            context.Entry(album).State = EntityState.Modified;

            await context.SaveChangesAsync();

            var updatedAlbum = await GetEntityAsync(album.Id);

            return mapper.Map<AlbumEditDTO>(updatedAlbum);
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
            var deletedAlbum = await context.Albums
                .Include(album => album.Songs)
                .FirstOrDefaultAsync(album => album.Id == entityId);

            context.Albums.Remove(deletedAlbum);

            await context.SaveChangesAsync();

            return entityId;
        }
        
        public async Task<AlbumPublicStatusDTO> SetPublicStatusAsync(AlbumPublicStatusDTO status)
        {
            if (status == null)
                throw new ArgumentNullException("Argument cannot be null");

            var album = await context.Albums
                .FirstOrDefaultAsync(album => album.Id == status.Id && album.AuthorId == status.UserId);

            album.IsPublished = status.IsPublished;

            context.Entry(album).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return status;
        }
    }
}

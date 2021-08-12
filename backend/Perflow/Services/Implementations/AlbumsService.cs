using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Songs;
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
            var entity = await context.Albums.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

            return mapper.Map<Album>(entity);
        }

        public async Task<AlbumFullDTO> GetAlbumFullAsync(int id)
        {
            var album = await context.Albums.Include(a => a.Songs)
                                                .ThenInclude(s => s.Artist)
                                            .Include(a => a.Author)
                                            .Include(a => a.Group)
                                            .AsNoTracking()
                                            .FirstOrDefaultAsync(e => e.Id == id);

            if (album == null)
            {
                throw new NotFoundExcepion($"{nameof(Album)} not found");
            }

            return mapper.Map<AlbumFullDTO>(album);
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
                    Authors = a.Songs.Select((s) => s.AuthorType == Domain.Enums.AuthorType.Artist ? s.Artist.UserName : s.Group.Name).ToList()
                })
                .ToListAsync();
            foreach(var entity in entities)
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

            User artist = null;
            Group group = null;
            var album = mapper.Map<Album>(albumDTO);

            if (albumDTO.GroupId == null && albumDTO.AuthorId != null)
            {
                artist = await context.Users.FirstOrDefaultAsync(user => user.Id == albumDTO.AuthorId);
                album.Author = artist;
            }
            else
            {
                group = await context.Groups.FirstOrDefaultAsync(group => group.Id == albumDTO.GroupId);
                album.Group = group;
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

            User artist = null;
            Group group = null;

            var album = mapper.Map<Album>(albumDTO);

            if (albumDTO.GroupId == null && albumDTO.AuthorId != null)
            {
                artist = await context.Users.FirstOrDefaultAsync(u => u.Id == albumDTO.AuthorId);
                album.Author = artist;
            }
            else
            {
                group = await context.Groups.FirstOrDefaultAsync(g => g.Id == albumDTO.GroupId);
                album.Group = group;
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
    }
}

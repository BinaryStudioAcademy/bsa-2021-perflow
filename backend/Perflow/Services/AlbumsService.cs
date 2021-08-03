using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Album;
using Perflow.Common.DTO.Song;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services
{
    public class AlbumsService : BaseService, IService<Album>
    {
        public AlbumsService(PerflowContext context, IMapper mapper)
    : base(context, mapper)
        { }

        public async Task<ICollection<Album>> GetEntitiesAsync()
        {
            var entities = await _context.Albums.AsNoTracking().ToListAsync();

            return _mapper.Map<ICollection<Album>>(entities);
        }

        public async Task<Album> GetEntityAsync(int id)
        {
            var entity = await _context.Albums.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

            return _mapper.Map<Album>(entity);
        }

        public async Task<ICollection<AlbumViewDTO>> GetNewReleases()
        {
            var firstDay = DateTime.Today.AddDays(-30);
            var entities = await _context.Albums
                                            .Include(a => a.Songs).ThenInclude(s => s.Artist)
                                            .Include(a => a.Songs).ThenInclude(s => s.Group)
                                            .AsNoTracking()
                                            .Where(a => a.CreatedAt >= firstDay && a.isPublished)
                                            .OrderByDescending(a => a.CreatedAt)
                                            .Select(a => new AlbumViewDTO
                                            {
                                                Name = a.Name,
                                                IconURL = a.IconURL,
                                                isSingle = a.isSingle,
                                                Reactions = a.Reactions.Count,
                                                Songs = _mapper.Map<ICollection<SongViewDTO>>(a.Songs.Take(10))
                                            })
                                            .ToListAsync();
            return entities;
        }

        public async Task<Album> AddEntityAsync(Album albumDTO)
        {
            if (albumDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            try
            {
                albumDTO.Id = 0;

                var album = _mapper.Map<Album>(albumDTO);

                await _context.Albums.AddAsync(album);

                await _context.SaveChangesAsync();

                var createdAlbum = await GetEntityAsync(album.Id);

                return _mapper.Map<Album>(createdAlbum);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Album> UpdateEntityAsync(Album albumDTO)
        {
            if (albumDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            try
            {
                var album = _mapper.Map<Album>(albumDTO);

                _context.Entry(album).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                var updatedAlbum = await GetEntityAsync(album.Id);

                return _mapper.Map<Album>(updatedAlbum);
            }
            catch (ArgumentException ex)
            {
                throw new ArgumentException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
            try
            {
                var deletedAlbum = await _context.Albums.FirstOrDefaultAsync(p => p.Id == entityId);

                _context.Albums.Remove(deletedAlbum);

                await _context.SaveChangesAsync();

                return entityId;
            }
            catch (ArgumentNullException ex)
            {
                throw new ArgumentNullException(ex.Message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}

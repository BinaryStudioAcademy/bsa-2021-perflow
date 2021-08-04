using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Playlist;

namespace Perflow.Services
{
    public class PlaylistService : BaseService, IService<PlaylistDTO>
    {

        public PlaylistService(PerflowContext context, IMapper mapper)
            : base(context, mapper)
        { }

        public async Task<ICollection<PlaylistDTO>> GetEntitiesAsync()
        {
            var entities = await _context.Playlists.AsNoTracking().ToListAsync();

            return _mapper.Map<ICollection<PlaylistDTO>>(entities);
        }

        public async Task<PlaylistDTO> GetEntityAsync(int id)
        {
            var entity = await _context.Playlists.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

            return _mapper.Map<PlaylistDTO>(entity);
        }

        public async Task<PlaylistDTO> AddEntityAsync(PlaylistDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            playlistDTO.Id = 0;

            var playlist = _mapper.Map<Playlist>(playlistDTO);

            await _context.Playlists.AddAsync(playlist);

            await _context.SaveChangesAsync();

            var createdPlaylist = await GetEntityAsync(playlist.Id);

            return _mapper.Map<PlaylistDTO>(createdPlaylist);
        }

        public async Task<PlaylistDTO> UpdateEntityAsync(PlaylistDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            var playlist = _mapper.Map<Playlist>(playlistDTO);

            _context.Entry(playlist).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            var updatedPlaylist = await GetEntityAsync(playlist.Id);

            return _mapper.Map<PlaylistDTO>(updatedPlaylist);
        }

        public async Task<int> DeleteEntityAsync(int entityId)
        {
             var deletedPlaylist = await _context.Playlists.FirstOrDefaultAsync(p => p.Id == entityId);

            _context.Playlists.Remove(deletedPlaylist);

            await _context.SaveChangesAsync();

            return entityId;
        }
    }
}

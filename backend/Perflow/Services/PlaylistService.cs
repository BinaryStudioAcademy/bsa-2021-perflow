using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
            var entity = await context.Playlists.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);

            return mapper.Map<PlaylistDTO>(entity);
        }

        public async Task<PlaylistDTO> AddEntityAsync(PlaylistDTO playlistDTO)
        {
            if (playlistDTO == null)
                throw new ArgumentNullException(nameof(playlistDTO), "Argument cannot be null");

            playlistDTO.Id = 0;

            var playlist = mapper.Map<Playlist>(playlistDTO);

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
    }
}

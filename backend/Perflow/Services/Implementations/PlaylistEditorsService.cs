﻿using AutoMapper;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Perflow.Services.Implementations
{
    public class PlaylistEditorsService : BaseService
    {
        public PlaylistEditorsService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {}

        public async Task<IEnumerable<ArtistReadDTO>> GetCollaborators(int playlistId)
        {
            var collaborators = await context.PlaylistEditors
                                            .Where(pe => pe.PlaylistId == playlistId)
                                            .Include(pe => pe.User)
                                            .Select(pe => pe.User)
                                            .ToListAsync();

            return mapper.Map<IEnumerable<ArtistReadDTO>>(collaborators);
        }

        public async Task Add(PlaylistEditorDTO pe)
        {
            await context.PlaylistEditors.AddAsync(mapper.Map<PlaylistEditor>(pe));

            await context.SaveChangesAsync();
        }

        public async Task Remove(PlaylistEditorDTO pe)
        {
            var removeEntity = context.PlaylistEditors
                                        .FirstOrDefault(_pe => _pe.PlaylistId == pe.PlaylistId &&
                                                               _pe.UserId == pe.UserId);
            context.PlaylistEditors.Remove(removeEntity);
            
            await context.SaveChangesAsync();
        }
    }
}

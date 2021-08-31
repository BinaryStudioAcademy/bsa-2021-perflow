using AutoMapper;
using Perflow.Common.DTO.PlaylistEditors;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class PlaylistEditorsService : BaseService
    {
        public PlaylistEditorsService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {}

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

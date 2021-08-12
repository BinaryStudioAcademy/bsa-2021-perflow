using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Groups;
using Perflow.DataAccess.Context;
using Perflow.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class GroupService : BaseService
    {
        public GroupService(PerflowContext context, IMapper mapper) : base(context, mapper)
        { }

        public async Task<ICollection<GroupForAlbumDTO>> GetAllGroupsAsync()
        {
            var groups = await context.Groups.AsNoTracking().ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
        }

        public async Task<ICollection<GroupForAlbumDTO>> GetGroupsByArtistAsync(int id)
        {
            var groups = await context.Groups
                .Where(group => group.Users.Any(user => user.Id == id))
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
        }
    }
}

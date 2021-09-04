using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Groups;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class GroupService : BaseService
    {
        private readonly IImageService _imageService;

        public GroupService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<ICollection<GroupForAlbumDTO>> GetAllGroupsAsync()
        {
            var groups = await context.Groups.AsNoTracking().ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
        }

        public async Task<ICollection<GroupForAlbumDTO>> GetGroupsByArtistAsync(int id)
        {
            var groups = await context.GroupArtist
                .Include(ga => ga.Group)
                .Include(ga => ga.Artist)
                .Where(ga => ga.Artist.Id == id)
                .Select(ga => ga.Group)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
        }

        public async Task<GroupShortDTO> CreateGroupAsync(GroupWriteDTO group)
        {
            if (group == null)
                throw new ArgumentNullException("Argument cannot be null");

            var groupEntity = mapper.Map<Group>(group);

            if (group.Icon != null)
            {
                groupEntity.IconURL = await _imageService.UploadImageAsync(group.Icon);
            }

            var createdGroup = await context.Groups.AddAsync(groupEntity);

            await context.SaveChangesAsync();

            return mapper.Map<GroupShortDTO>(new GroupWithIcon(createdGroup.Entity, _imageService.GetImageUrl(createdGroup.Entity.IconURL)));
        }

        public async Task<GroupLikedDTO> GetGroupAsync(int id, int userId)
        {
            var group = await context.Groups
                .Select(g => new GroupLikedDTO
                {
                    Id = g.Id,
                    Name = g.Name,
                    Description = g.Description,
                    IconURL = _imageService.GetImageUrl(g.IconURL),
                    IsLiked = g.Reactions.Any(r => r.UserId == userId)
                })
                .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null)
            {
                throw new NotFoundExcepion($"{nameof(Group)} not found");
            }

            return group;
        }
    }
}

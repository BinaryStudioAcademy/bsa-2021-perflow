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
            var groups = await context.Groups
                .Where(g => g.Approved == true)
                .AsNoTracking().ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
        }

        public async Task<ICollection<GroupForAlbumDTO>> GetGroupsByArtistAsync(int id)
        {
            var groups = await context.GroupArtist
                .Include(ga => ga.Group)
                .Include(ga => ga.Artist)
                .Where(ga => ga.Artist.Id == id && ga.Group.Approved == true)
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
            groupEntity.Approved = false;

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

        public async Task<bool> CheckGroupMemberAsync(int id, int userId)
        {
            var result = await context.GroupArtist
                                      .Include(ga => ga.Group)
                                      .Include(ga => ga.Artist)
                                      .Where(ga => ga.Group.Id == id)
                                      .AnyAsync(ga => ga.ArtistId == userId);
            return result;
        }

        public async Task<GroupFullDTO> EditGroupAsync(GroupEditDTO groupDTO)
        {
            if (groupDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            var updatedGroup = await context.Groups.FirstOrDefaultAsync(g => g.Id == groupDTO.Id);

            var group = mapper.Map(groupDTO, updatedGroup);

            if (groupDTO.Icon != null)
            {
                var oldImageId = group.IconURL;

                group.IconURL = await _imageService.UploadImageAsync(groupDTO.Icon);

                _ = _imageService.DeleteImageAsync(oldImageId);
            }

            context.Entry(group).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return mapper.Map<GroupFullDTO>(new GroupWithIcon(updatedGroup, _imageService.GetImageUrl(updatedGroup.IconURL)));
        }
    }
}

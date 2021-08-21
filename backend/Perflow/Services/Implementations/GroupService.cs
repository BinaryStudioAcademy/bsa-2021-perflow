using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Groups;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
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
            var groups = await context.Groups
                .Where(group => group.Users.Any(user => user.Id == id))
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<GroupForAlbumDTO>>(groups);
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

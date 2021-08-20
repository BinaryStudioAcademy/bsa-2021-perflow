using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.Auth;
using Shared.ExceptionsHandler.Exceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ArtistService : BaseService, IArtistService
    {
        private readonly IImageService _imageService;

        public ArtistService(PerflowContext context, IMapper mapper, IImageService imageService) : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task<ArtistDTO> GetArtistAsync(int id)
        {
            var user = await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new NotFoundExcepion($"{nameof(User)} not found");
            }

            user.IconURL = _imageService.GetImageUrl(user.IconURL);

            return mapper.Map<ArtistDTO>(user);
        }

        public async Task<IEnumerable<ArtistReadDTO>> GetTopArtistsByLikes(int amount)
        {
            var artists = await context.ArtistReactions
                                    .GroupBy(
                                        r => r.ArtistId,
                                        (key, group) => new { ArtistId = key, Count = group.Count() }
                                    )
                                    .OrderByDescending(group => group.Count)
                                    .Take(amount)
                                    .Join(
                                        context.Users,
                                        group => group.ArtistId,
                                        artist => artist.Id,
                                        (group, artist) => artist
                                     )
                                    .Select(
                                        a => mapper.Map<UserWithIcon, ArtistReadDTO>(new UserWithIcon(a, _imageService.GetImageUrl(a.IconURL)))
                                    )
                                    .ToListAsync();

            return artists;
        }

        public async Task<IEnumerable<ArtistReadDTO>> GetAllArtistsAsync()
        {
            var artists = await context.Users
                .AsNoTracking()
                .Where(user => user.Role == UserRole.Artist)
                .Select(
                    a => mapper.Map<UserWithIcon, ArtistReadDTO>(new UserWithIcon(a, _imageService.GetImageUrl(a.IconURL)))
                )
                .ToListAsync();

            return artists;
        }

        public async Task<ArtistFullDTO> GetArtistFullAsync(int id, int userId)
        {
            var artist = await context.Users
                                        .Include(a => a.Albums)
                                        .Include(a => a.Reactions)
                                        .Where(a => a.Id == id)
                                        .AsNoTracking()
                                        .Select(a => new ArtistFullDTO
                                        {
                                            Id = a.Id,
                                            UserName = a.UserName,
                                            IconURL = a.IconURL,
                                            Description = a.Description,
                                            Country = a.Country,
                                            Albums = mapper.Map<IEnumerable<AlbumReadDTO>>(a.Albums),
                                            IsLiked = a.ArtistReactions.Any(r => r.UserId == userId),
                                        })
                                        .FirstAsync();

            if (artist == null)
            {
                throw new NotFoundExcepion($"{nameof(User)} not found");
            }

            return artist;
        }
    }
}

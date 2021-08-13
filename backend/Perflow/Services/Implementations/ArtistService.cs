﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Users;
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
        public ArtistService(PerflowContext context, IMapper mapper) : base(context, mapper) { }

        public async Task<ArtistDTO> GetArtistAsync(int id)
        {
            var user = await context.Users.Include(u => u.Albums)
                                          .AsNoTracking()
                                          .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new NotFoundExcepion($"{nameof(User)} not found");
            }

            return mapper.Map<ArtistDTO>(user);
        }

        public async Task<ICollection<ArtistForAlbumDTO>> GetAllArtistsAsync()
        {
            var artists = await context.Users
                .AsNoTracking()
                .Where(user => user.Role == UserRole.Artist)
                .ToListAsync();

            return mapper.Map<ICollection<ArtistForAlbumDTO>>(artists);
        }
    }
}

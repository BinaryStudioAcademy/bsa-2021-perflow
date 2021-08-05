using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;

namespace Perflow.Services
{
    public class ArtistReactionService : BaseService
    {
        public ArtistReactionService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<ICollection<ArtistReadDTO>> GetArtistsByUserId(int userId)
        {
            var artists = context.ArtistReactions
                .Where(r => r.UserId == userId)
                .Select(userReaction => userReaction.Artist);
            return mapper.Map<ICollection<ArtistReadDTO>>(artists);
        }
    }
}

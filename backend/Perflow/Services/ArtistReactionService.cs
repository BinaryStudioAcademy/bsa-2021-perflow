using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Perflow.Common.DTO.User;
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

        public async Task<ICollection<UserDTO>> GetArtistsByUserId(int userId)
        {
            var artists = _context.ArtistReactions
                .Where(r => r.UserId == userId)
                .Select(userReaction => userReaction.Artist);
            return _mapper.Map<ICollection<UserDTO>>(artists);
        }
    }
}

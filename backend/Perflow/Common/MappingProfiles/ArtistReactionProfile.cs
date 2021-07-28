using AutoMapper;
using Perflow.Common.DTO.Artist;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class ArtistReactionProfile : Profile
    {
        public ArtistReactionProfile()
        {
            CreateMap<ArtistReaction, ArtistReactionDTO>();

            CreateMap<ArtistReactionDTO, ArtistReaction>();
        }
    }
}

using AutoMapper;
using Perflow.Common.DTO;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class PlaylistReactionProfile : Profile
    {
        public PlaylistReactionProfile()
        {
            CreateMap<PlaylistReaction, PlaylistReactionDTO>();

            CreateMap<PlaylistReactionDTO, PlaylistReaction>();
        }
    }
}

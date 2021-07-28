using AutoMapper;
using Perflow.Common.DTO.Album;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class AlbumReactionProfile : Profile
    {
        public AlbumReactionProfile()
        {
            CreateMap<AlbumReaction, AlbumReactionDTO>();

            CreateMap<AlbumReactionDTO, AlbumReaction>();
        }
    }
}

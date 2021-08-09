using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class ArtistProfile : Profile
    {
        public ArtistProfile()
        {
            CreateMap<User, ArtistReadDTO>();
            CreateMap<ArtistReadDTO, User>();
        }
        
    }
}

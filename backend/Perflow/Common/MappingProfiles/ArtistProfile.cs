using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class ArtistProfile : Profile
    {
        public ArtistProfile()
        {
            CreateMap<User, ArtistReadDTO>();
            CreateMap<ArtistReadDTO, User>();

            CreateMap<User, ArtistForAlbumDTO>();

            CreateMap<UserWithIcon, ArtistReadDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.User.Id))
                .ForMember(p => p.UserName, opt => opt.MapFrom(c => c.User.UserName))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL));

        }
        
    }
}

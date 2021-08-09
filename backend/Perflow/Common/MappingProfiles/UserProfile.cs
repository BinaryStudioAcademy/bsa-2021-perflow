using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDTO>();
            CreateMap<User, ArtistReadDTO>();
            CreateMap <User, ArtistForAlbumDTO>();

            CreateMap<UserReadDTO, User>();
        }
    }
}

using AutoMapper;
using Perflow.Common.DTO;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>();

            CreateMap<UserDTO, User>();
        }
    }
}

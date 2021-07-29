using AutoMapper;
using Perflow.Common.DTO.User;
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

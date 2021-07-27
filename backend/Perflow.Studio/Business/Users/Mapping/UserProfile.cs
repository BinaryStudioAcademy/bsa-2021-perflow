using AutoMapper;
using Perflow.Studio.Business.Users.DTOs;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Users.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDTO>();
            CreateMap<UserWriteDTO, User>();
        }
    }
}

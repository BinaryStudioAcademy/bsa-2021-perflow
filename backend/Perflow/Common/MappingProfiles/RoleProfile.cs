using AutoMapper;
using Perflow.Common.DTO.User;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<Role, RoleDTO>();

            CreateMap<RoleDTO, Role>();
        }
    }
}

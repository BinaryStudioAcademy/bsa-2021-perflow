using AutoMapper;
using Perflow.Common.DTO;
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

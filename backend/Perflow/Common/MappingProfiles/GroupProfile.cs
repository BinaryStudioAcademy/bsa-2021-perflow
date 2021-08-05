using AutoMapper;
using Perflow.Common.DTO.Groups;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<Group, GroupReadDTO>();
        }
    }
}

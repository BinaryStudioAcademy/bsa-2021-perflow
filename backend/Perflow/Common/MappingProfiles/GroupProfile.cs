using AutoMapper;
using Perflow.Common.DTO.Artist;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<Group, GroupDTO>();

            CreateMap<GroupDTO, Group>();
        }
    }
}

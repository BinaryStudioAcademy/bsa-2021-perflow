using AutoMapper;
using Perflow.Common.DTO.Groups;
using Perflow.Common.Helpers;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class GroupProfile : Profile
    {
        public GroupProfile()
        {
            CreateMap<Group, GroupReadDTO>();

            CreateMap<Group, GroupForAlbumDTO>();

            CreateMap<Group, GroupForPlaylistDTO>();

            CreateMap<Group, GroupLikedDTO>();

            CreateMap<Group, GroupNameDTO>();

            CreateMap<GroupWriteDTO, Group>();

            CreateMap<GroupWithIcon, GroupShortDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Group.Id))
                .ForMember(p => p.UserName, opt => opt.MapFrom(c => c.Group.Name))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.Group.IconURL));

        }
    }
}

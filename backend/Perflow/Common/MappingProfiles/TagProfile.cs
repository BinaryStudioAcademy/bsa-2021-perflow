using AutoMapper;
using Perflow.Common.DTO.Tags;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public class TagProfile : Profile
    {
        public TagProfile()
        {
            CreateMap<Tag, TagReadDTO>();

            CreateMap<TagWriteDTO, Tag>();
        }
    }
}

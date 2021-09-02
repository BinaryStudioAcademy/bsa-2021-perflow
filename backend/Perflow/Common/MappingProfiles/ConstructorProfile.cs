using AutoMapper;
using Perflow.Common.DTO.Constructor;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public class ConstructorProfile : Profile
    {
        public ConstructorProfile()
        {
            CreateMap<PageContainer, PageContainerDTO>().ReverseMap();

            CreateMap<PageContainer, PageContainerViewDTO>().ReverseMap();

            CreateMap<PageSectionEntity, PageSectionEntityDTO>().ReverseMap();

            CreateMap<PageSection, PageSectionDTO>().ReverseMap();
        }
    }
}

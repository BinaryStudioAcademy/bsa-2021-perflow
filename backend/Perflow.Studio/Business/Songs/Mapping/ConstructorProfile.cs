using AutoMapper;
using Perflow.Studio.Business.Constructor.DTOs;
using Perflow.Studio.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Songs.Mapping
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

using AutoMapper;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public class ContentSynchronizationProfile : Profile
    {
        public ContentSynchronizationProfile()
        {
            CreateMap<ContentSyncWriteDTO, ContentSynchronization>();
        }
    }
}

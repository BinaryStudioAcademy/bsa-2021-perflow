using AutoMapper;
using Perflow.Common.DTO.Search;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SearchHistoryProfile : Profile
    {
        public SearchHistoryProfile()
        {
            CreateMap<SearchHistory, SearchHistoryWriteDTO>();
            CreateMap<SearchHistoryWriteDTO, SearchHistory>();

            CreateMap<SearchHistory, SearchHistoryReadDTO>();
        }
    }
}

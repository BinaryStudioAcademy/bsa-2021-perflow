using AutoMapper;
using Perflow.Common.DTO.RecentlyPlayed;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public class RecentlyPlayedProfile : Profile
    {
        public RecentlyPlayedProfile()
        {
            CreateMap<RecentlyPlayed, RecentlyPlayedDTO>();

            CreateMap<RecentlyPlayedDTO, RecentlyPlayed>();
        }
    }
       
}

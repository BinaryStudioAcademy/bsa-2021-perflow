﻿using AutoMapper;
using Perflow.Common.DTO;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongReactionProfile : Profile
    {
        public SongReactionProfile()
        {
            CreateMap<SongReaction, SongReactionDTO>();

            CreateMap<SongReactionDTO, SongReaction>();
        }
    }
}

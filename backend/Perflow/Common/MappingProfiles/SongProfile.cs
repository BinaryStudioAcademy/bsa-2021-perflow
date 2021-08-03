﻿using AutoMapper;
using Perflow.Common.DTO.Song;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongViewDTO>()
                .ForMember("Artist", opt => opt.MapFrom(c => c.Artist.UserName))
                .ForMember("Group", opt => opt.MapFrom(c => c.Group.Name));

            CreateMap<SongViewDTO, Song>();
        }
    }
}

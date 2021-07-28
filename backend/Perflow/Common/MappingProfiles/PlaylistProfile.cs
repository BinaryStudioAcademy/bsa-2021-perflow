﻿using AutoMapper;
using Perflow.Common.DTO.Playlist;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class PlaylistProfile : Profile
    {
        public PlaylistProfile()
        {
            CreateMap<Playlist, PlaylistDTO>();

            CreateMap<PlaylistDTO, Playlist>();
        }
    }
}

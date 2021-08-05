using AutoMapper;
using Perflow.Common.DTO.Songs;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongReadDTO>();
        }
    }
}

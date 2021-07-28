using AutoMapper;
using Perflow.Common.DTO.Song;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongDTO>();

            CreateMap<SongDTO, Song>();
        }
    }
}

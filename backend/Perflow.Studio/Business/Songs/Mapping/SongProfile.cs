using AutoMapper;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Songs.Mapping
{
    public class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongReadDTO>();
            CreateMap<SongWriteDTO, Song>();
        }
    }
}

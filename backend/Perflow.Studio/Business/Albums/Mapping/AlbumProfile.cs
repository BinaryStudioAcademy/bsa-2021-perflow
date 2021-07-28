using AutoMapper;
using Perflow.Studio.Business.Albums.DTOs;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Albums.Mapping
{
    public class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumReadDTO>();
            CreateMap<AlbumWriteDTO, Album>();
        }
    }
}

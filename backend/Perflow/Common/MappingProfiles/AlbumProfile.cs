using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumReadDTO>();
            CreateMap<Album, AlbumForListDTO>();
            CreateMap<AlbumForListDTO, Album>();
        }
    }
}

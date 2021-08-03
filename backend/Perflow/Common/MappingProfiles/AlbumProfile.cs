using AutoMapper;
using Perflow.Common.DTO.Album;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumViewDTO>();
        }
    }
}

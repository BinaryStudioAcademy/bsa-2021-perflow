using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
using System.Collections.Generic;

namespace Perflow.Common.MappingProfiles
{
    public sealed class AlbumProfile : Profile
    {
        public AlbumProfile()
        {
            CreateMap<Album, AlbumViewDTO>();
            CreateMap<Album, AlbumReadDTO>();
            CreateMap<Album, AlbumForListDTO>();
            CreateMap<AlbumForListDTO, Album>();

            CreateMap<Album, AlbumFullDTO>()
            .AfterMap((src, dest, context) => dest.Songs = context.Mapper.Map<ICollection<Song>, ICollection<SongReadDTO>>(src.Songs))
            .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistForAlbumDTO>(src.Author));
        }
    }
}

using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
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
                .AfterMap((src, dest, context) => dest.Songs = context.Mapper.Map<ICollection<Song>, ICollection<SongForAlbumDTO>>(src.Songs))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistForAlbumDTO>(src.Author))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupForAlbumDTO>(src.Group));

            CreateMap<Album, AlbumForArtistDTO>()
                .AfterMap((src, dest, context) => dest.Author = context.Mapper.Map<User, ArtistForAlbumDTO>(src.Author))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupForAlbumDTO>(src.Group));

            CreateMap<AlbumEditDTO, Album>();
            CreateMap<Album, AlbumEditDTO>()
                .ForMember(p => p.AuthorId, opt => opt.MapFrom(c => c.AuthorId))
                .ForMember(p => p.GroupId, opt => opt.MapFrom(c => c.GroupId));

            CreateMap<Album, AlbumForPlaylistDTO>();

            CreateMap<Album, AlbumForPlaylistSongSearchDTO>();
        }
    }
}

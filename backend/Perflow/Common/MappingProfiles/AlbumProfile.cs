using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
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

            CreateMap<Album, AlbumNameDTO>();
            CreateMap<AlbumNameDTO, Album>();

            CreateMap<AlbumWriteDTO, Album>();

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

            CreateMap<AlbumWithIcon, AlbumEditDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Album.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Album.Name))
                .ForMember(p => p.IsSingle, opt => opt.MapFrom(c => c.Album.IsSingle))
                .ForMember(p => p.IsPublished, opt => opt.MapFrom(c => c.Album.IsPublished))
                .ForMember(p => p.AuthorType, opt => opt.MapFrom(c => c.Album.AuthorType))
                .ForMember(p => p.ReleaseYear, opt => opt.MapFrom(c => c.Album.ReleaseYear))
                .ForMember(p => p.Description, opt => opt.MapFrom(c => c.Album.Description))
                .ForMember(p => p.Region, opt => opt.MapFrom(c => c.Album.Region))
                .ForMember(p => p.CreatedAt, opt => opt.MapFrom(c => c.Album.CreatedAt))
                .ForMember(p => p.AuthorId, opt => opt.MapFrom(c => c.Album.AuthorId))
                .ForMember(p => p.GroupId, opt => opt.MapFrom(c => c.Album.GroupId))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL));

            CreateMap<AlbumWithIcon, AlbumReadDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Album.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Album.Name))
                .ForMember(p => p.IsSingle, opt => opt.MapFrom(c => c.Album.IsSingle))
                .ForMember(p => p.IsPublished, opt => opt.MapFrom(c => c.Album.IsPublished))
                .ForMember(p => p.AuthorType, opt => opt.MapFrom(c => c.Album.AuthorType))
                .ForMember(p => p.ReleaseYear, opt => opt.MapFrom(c => c.Album.ReleaseYear))
                .ForMember(p => p.Description, opt => opt.MapFrom(c => c.Album.Description))
                .ForMember(p => p.Region, opt => opt.MapFrom(c => c.Album.Region))
                .ForMember(p => p.CreatedAt, opt => opt.MapFrom(c => c.Album.CreatedAt))
                .ForMember(p => p.AuthorId, opt => opt.MapFrom(c => c.Album.AuthorId))
                .ForMember(p => p.GroupId, opt => opt.MapFrom(c => c.Album.GroupId))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL));

            CreateMap<Album, AlbumForPlaylistDTO>();

            CreateMap<Album, AlbumShortDTO>();

            CreateMap<Album, AlbumForEditGroupViewDTO>();

            CreateMap<Album, AlbumForPlaylistSongSearchDTO>();

            CreateMap<AlbumWithIcon, AlbumForPlaylistSongSearchDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Album.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Album.Name))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL));

            CreateMap<AlbumWithIcon, AlbumForPlaylistDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Album.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Album.Name))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL));
        }
    }
}

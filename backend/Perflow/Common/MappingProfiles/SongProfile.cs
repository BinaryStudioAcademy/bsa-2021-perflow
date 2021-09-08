using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Tags;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.Domain;
using System.Collections.Generic;
using System.Linq;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongReadDTO>()
                .ForMember(p => p.Artist, opt => opt.MapFrom(s => s.ArtistId != null
                     ? new ArtistReadDTO
                     {
                         Id = s.Artist.Id,
                         IconURL = s.Artist.IconURL,
                         IsArtist = true,
                         UserName = s.Artist.UserName
                     } : null
                ))
                .ForMember(p => p.Group, opt => opt.MapFrom(s => s.GroupId != null
                    ? new GroupReadDTO
                    (
                        s.Group.Id,
                        s.Group.Name,
                        s.Group.Artists.Select(ga => ga.Artist)
                            .Select((a) => new ArtistReadDTO
                            {
                                Id = a.Id,
                                IconURL = a.IconURL,
                                IsArtist = true,
                                UserName = a.UserName
                            }).ToList(),
                        s.Group.CreatedAt
                    ) : null
                ));

            CreateMap<LikedSong, SongReadDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Song.Id))
                .ForMember(d => d.AuthorType, opt => opt.MapFrom(s => s.Song.AuthorType))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Song.Name))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => s.Song.Duration))
                .ForMember(d => d.HasCensorship, opt => opt.MapFrom(s => s.Song.HasCensorship))
                .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => s.Song.CreatedAt))
                .ForMember(d => d.IsLiked, opt => opt.MapFrom(s => s.IsLiked))
                .AfterMap((src, dest, context) => dest.Album = context.Mapper.Map<Album, AlbumReadDTO>(src.Song.Album))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistReadDTO>(src.Song.Artist))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupReadDTO>(src.Song.Group));

            CreateMap<LikedSong, SongLikedDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Song.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Song.Name))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => s.Song.Duration))
                .ForMember(d => d.HasCensorship, opt => opt.MapFrom(s => s.Song.HasCensorship))
                .ForMember(d => d.IsLiked, opt => opt.MapFrom(s => s.IsLiked))
                .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => s.Song.CreatedAt))
                .AfterMap((src, dest, context) => dest.Album = context.Mapper.Map<Album, AlbumNameDTO>(src.Song.Album))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistNameDTO>(src.Song.Artist))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupNameDTO>(src.Song.Group));

            CreateMap<SongWithTags, SongForEditAlbumDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Song.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Song.Name))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => s.Song.Duration))
                .ForMember(d => d.HasCensorship, opt => opt.MapFrom(s => s.Song.HasCensorship))
                .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => s.Song.CreatedAt))
                .ForMember(d => d.IsLiked, opt => opt.MapFrom(s => s.IsLiked))
                .AfterMap((src, dest, context) => dest.Album = context.Mapper.Map<Album, AlbumForPlaylistDTO>(src.Song.Album))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistForAlbumDTO>(src.Song.Artist))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupForAlbumDTO>(src.Song.Group))
                .AfterMap((src, dest, context) => dest.Tags = context.Mapper.Map<IEnumerable<Tag>, IEnumerable<TagReadDTO>>(src.Tags));

            CreateMap<LikedSong, SongForAlbumDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Song.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Song.Name))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => s.Song.Duration))
                .ForMember(d => d.HasCensorship, opt => opt.MapFrom(s => s.Song.HasCensorship))
                .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => s.Song.CreatedAt))
                .ForMember(d => d.IsLiked, opt => opt.MapFrom(s => s.IsLiked))
                .AfterMap((src, dest, context) => dest.Album = context.Mapper.Map<Album, AlbumForPlaylistDTO>(src.Song.Album))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistForAlbumDTO>(src.Song.Artist))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupForAlbumDTO>(src.Song.Group));

            CreateMap<Song, SongViewDTO>()
                .ForMember("Artist", opt => opt.MapFrom(c => c.Artist.UserName))
                .ForMember("Group", opt => opt.MapFrom(c => c.Group.Name));

            CreateMap<SongViewDTO, Song>();

            CreateMap<SongWriteDTO, Song>();
            CreateMap<Song, SongWriteDTO>();

            CreateMap<Song, SongForPlaylistSongSearchDTO>();
        }
    }
}

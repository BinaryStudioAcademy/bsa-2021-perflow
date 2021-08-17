using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class SongProfile : Profile
    {
        public SongProfile()
        {
            CreateMap<Song, SongReadDTO>();

            CreateMap<LikedSong, SongReadDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Song.Id))
                .ForMember(d => d.AuthorType, opt => opt.MapFrom(s => s.Song.AuthorType))
                .ForMember(d => d.BlobId, opt => opt.MapFrom(s => s.Song.BlobId))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Song.Name))
                .ForMember(d => d.Duration, opt => opt.MapFrom(s => s.Song.Duration))
                .ForMember(d => d.HasCensorship, opt => opt.MapFrom(s => s.Song.HasCensorship))
                .ForMember(d => d.CreatedAt, opt => opt.MapFrom(s => s.Song.CreatedAt))
                .ForMember(d => d.IsLiked, opt => opt.MapFrom(s => s.IsLiked))
                .AfterMap((src, dest, context) => dest.Album = context.Mapper.Map<Album, AlbumReadDTO>(src.Song.Album))
                .AfterMap((src, dest, context) => dest.Artist = context.Mapper.Map<User, ArtistReadDTO>(src.Song.Artist))
                .AfterMap((src, dest, context) => dest.Group = context.Mapper.Map<Group, GroupReadDTO>(src.Song.Group));

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

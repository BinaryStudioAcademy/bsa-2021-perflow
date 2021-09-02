using AutoMapper;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class PlaylistProfile : Profile
    {
        public PlaylistProfile()
        {
            CreateMap<Playlist, PlaylistDTO>();

            CreateMap<PlaylistDTO, Playlist>();

            CreateMap<Playlist, PlaylistViewDTO>();

            CreateMap<Playlist, PlaylistNameDTO>();

            CreateMap<PlaylistNameDTO, Playlist>();

            CreateMap<PlaylistWriteDTO, Playlist>();

            CreateMap<PlaylistWithIcon, PlaylistViewDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Playlist.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Playlist.Name))
                .ForMember(p => p.Description, opt => opt.MapFrom(c => c.Playlist.Description))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL))
                .ForMember(p => p.AccessType, opt => opt.MapFrom(c => c.Playlist.AccessType));

            CreateMap<PlaylistWithIcon, PlaylistDTO>()
                .ForMember(p => p.Id, opt => opt.MapFrom(c => c.Playlist.Id))
                .ForMember(p => p.Name, opt => opt.MapFrom(c => c.Playlist.Name))
                .ForMember(p => p.Description, opt => opt.MapFrom(c => c.Playlist.Description))
                .ForMember(p => p.CreatedAt, opt => opt.MapFrom(c => c.Playlist.CreatedAt))
                .ForMember(p => p.AccessType, opt => opt.MapFrom(c => (AccessTypeDTO)c.Playlist.AccessType))
                .ForMember(p => p.IconURL, opt => opt.MapFrom(c => c.IconURL))
                .AfterMap((src, dest, context) => dest.Author = context.Mapper.Map<UserForPlaylistDTO>(src.Playlist.Author));
        }
    }
}

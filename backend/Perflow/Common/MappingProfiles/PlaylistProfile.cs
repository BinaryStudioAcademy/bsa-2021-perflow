using AutoMapper;
using Perflow.Common.DTO.Playlists;
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
        }
    }
}

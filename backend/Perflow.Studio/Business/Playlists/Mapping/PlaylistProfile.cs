using AutoMapper;
using Perflow.Studio.Business.Playlists.DTOs;
using Perflow.Studio.Domain.Entities;

namespace Perflow.Studio.Business.Playlists.Mapping
{
    public class PlaylistProfile : Profile
    {
        public PlaylistProfile()
        {
            CreateMap<Playlist, PlaylistReadDTO>();
            CreateMap<PlaylistWriteDTO, Playlist>();
        }
    }
}

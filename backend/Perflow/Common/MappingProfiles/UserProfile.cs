using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
using System.Collections.Generic;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDTO>();
            CreateMap<User, ArtistReadDTO>();
            CreateMap<User, ArtistForAlbumDTO>();

            CreateMap<UserReadDTO, User>();

            CreateMap<User, ArtistDTO>()
                .AfterMap((src, dest, context) => dest.Albums = context.Mapper
                                                                       .Map<ICollection<Album>, ICollection<AlbumForArtistDTO>>(src.Albums));

            CreateMap<UserWriteDTO, User>();

            CreateMap<User, UserForPlaylistDTO>();

            CreateMap<UserForPlaylistDTO, User>();

            CreateMap<User, ArtistFullDTO>()
                .AfterMap((src, dest, context) => dest.Albums = context.Mapper.Map<ICollection<Album>, ICollection<AlbumReadDTO>>(src.Albums));
        }
    }
}

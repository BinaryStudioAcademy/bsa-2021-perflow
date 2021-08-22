using AutoMapper;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Users;
using Perflow.Common.Helpers;
using Perflow.Domain;
using System.Collections.Generic;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDTO>();

            CreateMap<UserWithIcon, UserReadDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.User.Id))
                .ForMember(d => d.Gender, opt => opt.MapFrom(s => s.User.Gender))
                .ForMember(d => d.Email, opt => opt.MapFrom(s => s.User.Email))
                .ForMember(d => d.Birthday, opt => opt.MapFrom(s => s.User.Birthday))
                .ForMember(d => d.Country, opt => opt.MapFrom(s => s.User.Country))
                .ForMember(d => d.Description, opt => opt.MapFrom(s => s.User.Description))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(d => d.Subscriptions, opt => opt.MapFrom(s => s.User.Subscriptions))
                .ForMember(d => d.IconURL, opt => opt.MapFrom(s => s.IconURL));

            CreateMap<UserWithIcon, ArtistReadDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.User.Id))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.UserName))
                .ForMember(d => d.IconURL, opt => opt.MapFrom(s => s.IconURL));

            CreateMap<User, ArtistReadDTO>();
            CreateMap<User, ArtistForAlbumDTO>();

            CreateMap<UserReadDTO, User>();

            CreateMap<User, ArtistDTO>()
                .AfterMap((src, dest, context) => dest.Albums = context.Mapper
                                                                       .Map<ICollection<Album>, ICollection<AlbumForArtistDTO>>(src.Albums));

            CreateMap<UserWriteDTO, User>();

            CreateMap<User, UserForPlaylistDTO>();
            CreateMap<UserForPlaylistDTO, User>();

            CreateMap<AlbumViewAuthorsDTO, User>();
            CreateMap<User, AlbumViewAuthorsDTO>();
            CreateMap<User, ArtistFullDTO>();
        }
    }
}

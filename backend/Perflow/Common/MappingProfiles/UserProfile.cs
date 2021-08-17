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

            CreateMap<(User, string), UserReadDTO>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Item1.Id))
                .ForMember(d => d.Gender, opt => opt.MapFrom(s => s.Item1.Gender))
                .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Item1.Email))
                .ForMember(d => d.Birthday, opt => opt.MapFrom(s => s.Item1.Birthday))
                .ForMember(d => d.Country, opt => opt.MapFrom(s => s.Item1.Country))
                .ForMember(d => d.Description, opt => opt.MapFrom(s => s.Item1.Description))
                .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.Item1.UserName))
                .ForMember(d => d.Subscriptions, opt => opt.MapFrom(s => s.Item1.Subscriptions))
                .ForMember(d => d.IconURL, opt => opt.MapFrom(s => s.Item2));

            CreateMap<User, ArtistReadDTO>();
            CreateMap<User, ArtistForAlbumDTO>();

            CreateMap<UserReadDTO, User>();

            CreateMap<User, ArtistDTO>()
                .AfterMap((src, dest, context) => dest.Albums = context.Mapper
                                                                       .Map<ICollection<Album>, ICollection<AlbumForArtistDTO>>(src.Albums));

            CreateMap<UserWriteDTO, User>();
        }
    }
}

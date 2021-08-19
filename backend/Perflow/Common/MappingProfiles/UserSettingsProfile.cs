using AutoMapper;
using Perflow.Common.DTO.Users;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserSettingsProfile : Profile
    {
        public UserSettingsProfile()
        {
            CreateMap<UserChangeSettingsDTO, UserSettings>()
                .ForMember(dest => dest.Autoplay, opt => opt.Condition(src => (src.Autoplay.HasValue)))
                .ForMember(dest => dest.Language, opt => opt.Condition(src => (src.Language != null)))
                .ForMember(dest => dest.Quality, opt => opt.Condition(src => (src.Quality.HasValue)))
                .ForMember(dest => dest.ShowExplicitContent, opt => opt.Condition(src => (src.ShowExplicitContent.HasValue)))
                .ForMember(dest => dest.ShowFriendsPlaying, opt => opt.Condition(src => (src.ShowFriendsPlaying.HasValue)))
                .ForMember(dest => dest.ShowNewReleases, opt => opt.Condition(src => (src.ShowNewReleases.HasValue)));
        }
    }
}

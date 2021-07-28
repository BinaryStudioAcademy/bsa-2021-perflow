using AutoMapper;
using Perflow.Common.DTO.User;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public sealed class UserSettingsProfile : Profile
    {
        public UserSettingsProfile()
        {
            CreateMap<UserSettings, UserSettingsDTO>();

            CreateMap<UserSettingsDTO, UserSettings>();
        }
    }
}

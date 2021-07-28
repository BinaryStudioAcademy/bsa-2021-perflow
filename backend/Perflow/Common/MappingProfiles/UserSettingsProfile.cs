using AutoMapper;
using Perflow.Common.DTO;
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

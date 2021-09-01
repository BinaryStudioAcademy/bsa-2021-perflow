using AutoMapper;
using Perflow.Common.DTO.Notifications;
using Perflow.Domain;

namespace Perflow.Common.MappingProfiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notification, NotificationReadDTO>();
        }
    }
}

using AutoMapper;
using Perflow.Common.DTO;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.MappingProfiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notification, NotificationDTO>();

            CreateMap<NotificationDTO, Notification>();
        }
    }
}

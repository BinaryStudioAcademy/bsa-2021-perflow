using Perflow.Domain.Enums;
using System;

namespace Perflow.Common.DTO.Notifications
{
    public class NotificationWriteDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Reference { get; set; }
        public NotificationType Type { get; set; }
    }
}

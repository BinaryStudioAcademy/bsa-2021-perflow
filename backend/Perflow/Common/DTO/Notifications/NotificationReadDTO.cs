using Perflow.Domain.Enums;
using System;

namespace Perflow.Common.DTO.Notifications
{
    public class NotificationReadDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Reference { get; set; }
        public bool IsRead { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public NotificationType Type { get; set; }
        public int UserId { get; set; }
    }
}

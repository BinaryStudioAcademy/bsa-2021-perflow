using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;

namespace Perflow.Domain
{
    public class Notification : AuditEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool IsRead { get; set; }
        public int Reference { get; set; }
        public NotificationType Type { get; set; }
    }
}

using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class Notification: AuditEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public bool IsRead { get; set; }
        //public int Reference { get; set; }     To implement
    }
}

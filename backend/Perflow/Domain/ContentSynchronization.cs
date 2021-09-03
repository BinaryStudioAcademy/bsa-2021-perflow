using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class ContentSynchronization : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int SongId { get; set; }
        public Song Song { get; set; }
        public int Time { get; set; }
    }
}
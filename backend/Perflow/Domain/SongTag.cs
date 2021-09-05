using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class SongTag : BaseEntity
    {
        public int SongId { get; set; }
        public Song Song { get; set; }

        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}

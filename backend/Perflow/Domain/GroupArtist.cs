using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class GroupArtist : AuditEntity
    {
        public int ArtistId { get; set; }
        public User Artist { get; set; }

        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}

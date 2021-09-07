using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class SearchHistory : AuditEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int? AlbumId { get; set; }
        public Album Album { get; set; }
        public int? PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
        public int? ArtistId { get; set; }
        public User Artist { get; set; }
        public int? GroupId { get; set; }
        public Group Group { get; set; }
    }
}

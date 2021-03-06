using System.Collections.Generic;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumShortDTO
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ReleaseYear { get; set; }
        public string IconURL { get; set; }
        public string AuthorName { get; set; }
        public bool IsSingle { get; set; }
        public bool IsLiked { get; set; }
        public List<int> ArtistIds { get; set; }
    }
}

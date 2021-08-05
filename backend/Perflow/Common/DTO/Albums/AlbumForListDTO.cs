using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumForListDTO
    {
        public string Name { get; set; }
        public int? ReleaseYear { get; set; }
        public string IconURL { get; set; }
        public ArtistReadDTO Author { get; set; }
    }
}

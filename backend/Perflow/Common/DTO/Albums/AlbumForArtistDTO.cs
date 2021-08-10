using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumForArtistDTO
    {
        public int Id { get; set; }
        public int ReleaseYear { get; set; }
        public string Name { get; set; }
        public string IconURL { get; set; }
        public ArtistForAlbumDTO Artist { get; set; }
        public GroupForAlbumDTO Group { get; set; }
    }
}

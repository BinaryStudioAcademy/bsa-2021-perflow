using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Users;

namespace Perflow.Common.DTO.Songs
{
    public class SongForPlaylistDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public UserForPlaylistDTO Artist { get; set; }
        public GroupForPlaylistDTO Group { get; set; }
        public AlbumForPlaylistDTO Album { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
        public bool IsLiked { get; set; }
        public int Order { get; set; }
    }
}

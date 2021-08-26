using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public struct LikedSong
    {
        public Song Song;
        public bool IsLiked;

        public LikedSong(Song s, string icon, bool isLiked)
        {
            Song = s;
            Song.Album.IconURL = icon;
            IsLiked = isLiked;
        }
    }
}

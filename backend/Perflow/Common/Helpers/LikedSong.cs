using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public struct LikedSong
    {
        public Song Song;
        public bool IsLiked;

        public LikedSong(Song s, bool isLiked)
        {
            Song = s;
            IsLiked = isLiked;
        }
    }
}

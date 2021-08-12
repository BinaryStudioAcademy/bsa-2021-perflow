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

        public static implicit operator (Song s, bool)(LikedSong value)
        {
            return (value.Song, value.IsLiked);
        }

        public static implicit operator LikedSong((Song s, bool) value)
        {
            return new LikedSong(value.s, value.Item2);
        }
    }
}

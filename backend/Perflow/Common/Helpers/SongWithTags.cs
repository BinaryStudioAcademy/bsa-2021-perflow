using Perflow.Domain;
using System.Collections.Generic;

namespace Perflow.Common.Helpers
{
    public struct SongWithTags
    {
        public Song Song;
        public bool IsLiked;
        public IEnumerable<Tag> Tags;

        public SongWithTags(Song s, string icon, bool isLiked, IEnumerable<Tag> tags)
        {
            Song = s;
            Song.Album.IconURL = icon;
            IsLiked = isLiked;
            Tags = tags;
        }
    }
}

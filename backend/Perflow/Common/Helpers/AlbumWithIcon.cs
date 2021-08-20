using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public class AlbumWithIcon
    {
        public Album Album;
        public string IconURL;

        public AlbumWithIcon(Album album, string iconURL)
        {
            Album = album;
            IconURL = iconURL;
        }
    }
}

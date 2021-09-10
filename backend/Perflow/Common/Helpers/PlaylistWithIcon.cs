using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public struct PlaylistWithIcon
    {
        public Playlist Playlist;
        public string IconURL;

        public PlaylistWithIcon(Playlist playlist, string iconURL)
        {
            Playlist = playlist;
            IconURL = iconURL;
        }
    }
}

using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public sealed class PlaylistReaction : Reaction
    {
        public int PlaylistId { get; set; }
        public Playlist Playlist { get; set; }
    }
}

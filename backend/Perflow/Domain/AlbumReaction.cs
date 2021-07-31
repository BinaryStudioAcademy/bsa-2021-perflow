using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class AlbumReaction : Reaction
    {
        public int AlbumId { get; set; }
        public Album Album { get; set; }
    }
}

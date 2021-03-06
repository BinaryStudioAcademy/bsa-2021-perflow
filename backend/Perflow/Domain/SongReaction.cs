using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public sealed class SongReaction : Reaction
    {
        public int SongId { get; set; }
        public Song Song { get; set; }
    }
}

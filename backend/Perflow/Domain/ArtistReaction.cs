using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class ArtistReaction : Reaction
    {
        public int ArtistId { get; set; }
        public User Artist { get; set; }
    }
}

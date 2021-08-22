using Perflow.Domain.Abstract;

namespace Perflow.Domain
{
    public class GroupReaction : Reaction
    {
        public int GroupId { get; set; }
        public Group Group { get; set; }
    }
}

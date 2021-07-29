
namespace Perflow.Domain.Abstract
{
    public abstract class Reaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }

    }
}

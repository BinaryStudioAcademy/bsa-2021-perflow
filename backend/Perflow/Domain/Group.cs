using Perflow.Domain.Abstract;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Group : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }
    }
}

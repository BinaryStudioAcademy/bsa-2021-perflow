using Perflow.Domain.Abstract;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Group : AuditEntity
    {
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }

    }
}

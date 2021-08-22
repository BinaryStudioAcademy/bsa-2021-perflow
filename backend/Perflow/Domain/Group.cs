using Perflow.Domain.Abstract;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Group : AuditEntity
    {
        public string Name { get; set; }

        public string IconURL { get; set; }

        public string Description { get; set; }

        public ICollection<User> Users { get; set; }

        public ICollection<GroupReaction> Reactions { get; set; }

    }
}

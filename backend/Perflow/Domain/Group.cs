using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public sealed class Group : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<User> Users { get; set; }

        private DateTimeOffset _createdAt;
        public DateTimeOffset CreatedAt
        {
            get => _createdAt;
            set => _createdAt = (value == DateTimeOffset.MinValue) ? DateTimeOffset.Now : value;
        }
        public Group()
        {
            CreatedAt = DateTimeOffset.Now;
        }
    }
}

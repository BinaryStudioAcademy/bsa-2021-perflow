using System;

namespace Perflow.Domain.Abstract
{
    public abstract class BaseEntity
    {
        private DateTimeOffset _createdAt;

        public int Id { get; set; }

        public DateTimeOffset CreatedAt
        {
            get => _createdAt;
            set => _createdAt = (value == DateTimeOffset.MinValue) ? DateTimeOffset.Now : value;
        }

        public BaseEntity()
        {
            CreatedAt = DateTimeOffset.Now;
        }
    }
}

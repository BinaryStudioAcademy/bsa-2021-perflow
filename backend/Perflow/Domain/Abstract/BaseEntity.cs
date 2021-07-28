using System;

namespace Perflow.Domain.Abstract
{
    public abstract class BaseEntity
    {
        private DateTime _createdAt;

        public int Id { get; set; }

        public DateTime CreatedAt
        {
            get => _createdAt;
            set => _createdAt = (value == DateTime.MinValue) ? DateTime.Now : value;
        }

        public BaseEntity()
        {
            CreatedAt = DateTime.Now;
        }
    }
}

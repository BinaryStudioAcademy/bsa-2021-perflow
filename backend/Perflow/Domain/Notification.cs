using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class Notification: BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public bool IsRead { get; set; }
        //public int Reference { get; set; }     To implement

        private DateTimeOffset _createdAt;
        public DateTimeOffset CreatedAt
        {
            get => _createdAt;
            set => _createdAt = (value == DateTimeOffset.MinValue) ? DateTimeOffset.Now : value;
        }
        public Notification()
        {
            CreatedAt = DateTimeOffset.Now;
        }
    }
}

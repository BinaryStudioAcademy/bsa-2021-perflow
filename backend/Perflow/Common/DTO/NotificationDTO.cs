using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Perflow.Common.DTO.User;

namespace Perflow.Common.DTO
{
    public class NotificationDTO
    {
        public int Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int AuthorId { get; set; }
        public UserDTO Author { get; set; }
        public bool IsRead { get; set; }
    }
}

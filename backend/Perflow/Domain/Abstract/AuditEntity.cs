using System;

namespace Perflow.Domain.Abstract
{
    public class AuditEntity : BaseEntity
    {
        public DateTimeOffset CreatedAt { get; set; }
    }
}

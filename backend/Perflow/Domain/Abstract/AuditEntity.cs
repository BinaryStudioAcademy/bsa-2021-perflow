using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain.Abstract
{
    public class AuditEntity : BaseEntity
    {
        public DateTimeOffset CreatedAt { get; set; }
    }
}

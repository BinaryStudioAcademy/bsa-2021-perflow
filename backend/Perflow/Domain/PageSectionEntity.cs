using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class PageSectionEntity : BaseEntity
    {
        public EntityType EntityType { get; set; }
        public int ReferenceId { get; set; }
        public int PageSectionId { get; set; }
        public int Position { get; set; }
    }
}

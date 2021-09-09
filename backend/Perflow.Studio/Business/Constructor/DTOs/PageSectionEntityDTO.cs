using Perflow.Studio.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Business.Constructor.DTOs
{
    public class PageSectionEntityDTO
    {
        public int Id { get; set; }
        public EntityType EntityType { get; set; }
        public int ReferenceId { get; set; }
        public int Position { get; set; }
        public dynamic Entity { get; set; }
    }
}

using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class PageSection : BaseEntity
    {
        public int Position { get; set; }
        public string Name { get; set; }
        public int PageContainerId { get; set; }
        public PageContainer PageContainer { get; set; }
        public ICollection<PageSectionEntity> PageSectionEntities { get; set; }
    }
}

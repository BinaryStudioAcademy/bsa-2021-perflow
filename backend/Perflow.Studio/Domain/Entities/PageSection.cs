using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Studio.Domain.Entities
{
    public class PageSection : IEntity
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Name { get; set; }
        public int PageContainerId { get; set; }
        public ICollection<PageSectionEntity> PageSectionEntities { get; set; }
    }
}

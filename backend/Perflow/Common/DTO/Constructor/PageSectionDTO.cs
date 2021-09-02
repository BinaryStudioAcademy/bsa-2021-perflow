using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Constructor
{
    public class PageSectionDTO
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public string Name { get; set; }
        public ICollection<PageSectionEntityDTO> PageSectionEntities { get; set; }
    }
}

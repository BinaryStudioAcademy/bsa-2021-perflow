using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Constructor
{
    public class PageContainerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPublished { get; set; }
        public bool ShowRecentlyPlayed { get; set; }
        public bool ShowMix { get; set; }
        public ICollection<PageSectionDTO> PageSections { get; set; }
    }
}

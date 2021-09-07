using System.Collections.Generic;

namespace Perflow.Common.DTO.Constructor
{
    public class PageContainerDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPublished { get; set; }
        public bool ShowRecentlyPlayed { get; set; }
        public bool ShowMix { get; set; }
        public bool ShowRecommendations { get; set; }
        public ICollection<PageSectionDTO> PageSections { get; set; }
    }
}

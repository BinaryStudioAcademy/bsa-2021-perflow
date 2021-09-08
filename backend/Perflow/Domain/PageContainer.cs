using Perflow.Domain.Abstract;
using System.Collections.Generic;

namespace Perflow.Domain
{
    public class PageContainer : BaseEntity
    {
        public string Name { get; set; }
        public bool IsPublished { get; set; }
        public bool ShowRecentlyPlayed { get; set; }
        public bool ShowMix { get; set; }
        public bool ShowRecommendations { get; set; }
        public ICollection<PageSection> PageSections { get; set; }
    }
}

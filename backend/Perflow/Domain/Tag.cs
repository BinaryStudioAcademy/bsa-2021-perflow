using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;

namespace Perflow.Domain
{
    public class Tag : BaseEntity
    {
        public string Name { get; set; }

        public TagType Type { get; set; }

        public string Color { get; set; }
    }
}

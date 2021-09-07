using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Tags
{
    public class TagReadDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public TagType Type { get; set; }
    }
}

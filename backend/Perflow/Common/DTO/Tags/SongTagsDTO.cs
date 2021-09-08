using System.Collections.Generic;

namespace Perflow.Common.DTO.Tags
{
    public class SongTagsDTO
    {
        public int SongId { get; set; }

        public ICollection<TagReadDTO> Tags { get; set; }
    }
}

using Perflow.Common.DTO.Songs;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumViewDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string IconURL { get; set; }
        public AlbumViewAuthorsDTO Author { get; set; }
    }
}

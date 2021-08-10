using Perflow.Common.DTO.Songs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumLikedDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string IconURL { get; set; }
        public bool IsSingle { get; set; }
        public int Reactions { get; set; }
        public ICollection<SongViewDTO> Songs { get; set; }
    }
}

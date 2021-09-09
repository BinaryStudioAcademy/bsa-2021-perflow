using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumForEditGroupViewDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ReleaseYear { get; set; }
        public string IconURL { get; set; }
        public string AuthorName { get; set; }
        public bool IsPublished { get; set; }
        public bool IsSingle { get; set; }
    }
}

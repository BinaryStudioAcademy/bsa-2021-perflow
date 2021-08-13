using Perflow.Common.DTO.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumViewAuthorsDTO
    {
        public AlbumViewAuthorsDTO(int id, string name, bool isArtist)
        {
            Id = id;
            Name = name;
            IsArtist = isArtist;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsArtist { get; set; }
    }
}

using Perflow.Common.DTO.Song;
using Perflow.Common.DTO.User;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Album
{
    public class AlbumViewDTO
    {
        public string Name { get; set; }
        public string IconURL { get; set; }
        public bool isSingle { get; set; }
        public int Reactions { get; set; }
        public ICollection<SongViewDTO> Songs { get; set; }
    }
}

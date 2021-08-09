﻿using Perflow.Common.DTO.Songs;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumViewDTO
    {
        public string Name { get; set; }
        public string IconURL { get; set; }
        public bool IsSingle { get; set; }
        public int Reactions { get; set; }
        public ICollection<SongViewDTO> Songs { get; set; }
    }
}

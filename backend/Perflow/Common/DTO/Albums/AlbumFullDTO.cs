﻿using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Users;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumFullDTO
    {
        public int Id { get; set; }
        public int? ReleaseYear { get; set; }
        public string Name { get; set; }
        public string IconURL { get; set; }
        public ArtistForAlbumDTO Artist { get; set; }
        public GroupForAlbumDTO Group { get; set; }
        public IEnumerable<SongReadDTO> Songs { get; set; }
        public bool IsLiked { get; set; }
    }
}

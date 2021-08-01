﻿using Perflow.Common.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Playlist
{
    public class PlaylistDTO
    {
        public int Id { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public string IconURL { get; set; }

        public UserDTO Author { get; set; }

        public AccessTypeDTO AccessType { get; set; }
    }
}
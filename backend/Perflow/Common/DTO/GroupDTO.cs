﻿using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO
{
    public sealed class GroupDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public ICollection<UserDTO> Users { get; set; }
    }
}

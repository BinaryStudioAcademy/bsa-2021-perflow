﻿using Perflow.Domain;
using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO
{
    public sealed class UserDTO
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public DateTime Birthday { get; set; }
        public bool Gender { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public int GroupId { get; set; }
        public GroupDTO Group { get; set; }
        public ICollection<RoleDTO> Roles { get; set; }
        public ICollection<ArtistFollower> Followers { get; set; }
        public ICollection<ArtistFollower> Subscriptions { get; set; }
    }
}

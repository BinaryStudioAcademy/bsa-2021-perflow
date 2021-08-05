using System;
using System.Collections.Generic;

namespace Perflow.Common.DTO.Users
{
    public class UserReadDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Email { get; set; }
        public DateTimeOffset Birthday { get; set; }
        public bool Gender { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public int? GroupId { get; set; }
        public ICollection<ArtistFollowerDTO> Subscriptions { get; set; }
    }
}

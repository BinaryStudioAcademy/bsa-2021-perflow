using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.User
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public string Email { get; set; }
        public DateTimeOffset Birthday { get; set; }
        public bool Gender { get; set; }
        public ICollection<ArtistFollowerDTO> Subscriptions { get; set; }
    }
}

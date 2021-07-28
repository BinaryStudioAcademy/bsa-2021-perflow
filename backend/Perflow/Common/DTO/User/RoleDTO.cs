using System.Collections.Generic;
using Perflow.Common.DTO.User;

namespace Perflow.Common.DTO.User
{
    public class RoleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<UserDTO> Users { get; set; }
    }
}

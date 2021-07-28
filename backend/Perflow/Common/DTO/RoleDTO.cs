using System.Collections.Generic;

namespace Perflow.Common.DTO
{
    public class RoleDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<UserDTO> Users { get; set; }
    }
}

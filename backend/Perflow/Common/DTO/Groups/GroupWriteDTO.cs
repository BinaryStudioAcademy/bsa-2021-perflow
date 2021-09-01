using Microsoft.AspNetCore.Http;

namespace Perflow.Common.DTO.Groups
{
    public class GroupWriteDTO
    {
        public string Name { get; set; }
        public IFormFile Icon { get; set; }
        public string Description { get; set; }
    }
}


using Microsoft.AspNetCore.Http;

namespace Perflow.Common.DTO.Users
{
    public class UserChangeIconDTO
    {
        public int Id { get; set; }

        public IFormFile Icon { get; set; }
    }
}
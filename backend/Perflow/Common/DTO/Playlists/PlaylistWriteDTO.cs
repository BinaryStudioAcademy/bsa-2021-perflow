using Microsoft.AspNetCore.Http;

namespace Perflow.Common.DTO.Playlists
{
    public class PlaylistWriteDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public IFormFile Icon { get; set; }

        public AccessTypeDTO AccessType { get; set; }
    }
}

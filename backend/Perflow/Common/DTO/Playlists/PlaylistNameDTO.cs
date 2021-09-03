using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Playlists
{
    public class PlaylistNameDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AccessTypeDTO? AccessType { get; set; }
    }
}

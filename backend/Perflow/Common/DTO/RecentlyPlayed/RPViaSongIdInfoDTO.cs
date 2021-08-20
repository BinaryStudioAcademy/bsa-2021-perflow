using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.RecentlyPlayed
{
    public class RPViaSongIdInfoDTO
    {
        public int UserId { get; set; }
        public int? PlaylistId { get; set; }
    }
}

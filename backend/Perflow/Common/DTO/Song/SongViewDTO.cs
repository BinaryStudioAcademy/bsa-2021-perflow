using Perflow.Common.DTO.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Song
{
    public class SongViewDTO
    {
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Group { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
    }
}

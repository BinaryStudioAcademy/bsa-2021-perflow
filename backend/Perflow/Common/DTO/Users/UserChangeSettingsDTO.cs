using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Common.DTO.Users
{
    public class UserChangeSettingsDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Language { get; set; }
        public bool? ShowExplicitContent { get; set; }
        public bool? Autoplay { get; set; }
        public AudioQuality? Quality { get; set; }
        public bool? ShowNewReleases { get; set; }
        public bool? ShowFriendsPlaying { get; set; }
    }
}

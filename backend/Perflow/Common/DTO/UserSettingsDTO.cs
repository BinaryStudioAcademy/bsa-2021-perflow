using Perflow.Domain.Enums;
using System;

namespace Perflow.Common.DTO
{
    public class UserSettingsDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public string Language { get; set; }
        public bool ShowExplicitContent { get; set; }
        public bool Autoplay { get; set; }
        public AudioQuality Quality { get; set; }
        public bool ShowNewReleases { get; set; }
        public bool ShowFriendsPlaying { get; set; }
    }
}

﻿using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;

namespace Perflow.Domain
{
    public class UserSettings : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public string Language { get; set; }
        public bool? ShowExplicitContent { get; set; }
        public bool? Autoplay { get; set; }
        public AudioQuality Quality { get; set; }
        public bool? ShowNewReleases { get; set; }
        public bool? ShowFriendsPlaying { get; set; }
    }
}

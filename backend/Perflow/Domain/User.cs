using Perflow.Domain.Abstract;
using System;
using System.Collections.Generic;
using Shared.Auth;

namespace Perflow.Domain
{
    public sealed class User : AuditEntity
    {
        public string FirebaseId { get; set; }

        public UserRole Role { get; set; }

        public string UserName { get; set; }

        public string IconURL { get; set; }

        public string Description { get; set; }

        public string Email { get; set; }

        public string Country { get; set; }

        public DateTimeOffset Birthday { get; set; }

        public bool Gender { get; set; }

        public int? GroupId { get; set; }

        public Group Group { get; set; }

        public ICollection<ArtistFollower> Followers { get; set; }

        public ICollection<ArtistFollower> Subscriptions { get; set; }

        public ICollection<SongReaction> Reactions { get; set; }

    }
}

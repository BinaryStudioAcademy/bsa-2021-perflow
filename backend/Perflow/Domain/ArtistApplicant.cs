using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using Shared.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Domain
{
    public class ArtistApplicant : BaseEntity
    {
        public ArtistApplicant(int userId, UserRole memberType)
        {
            UserId = userId;
            MemberType = memberType;
            Status = ApplicationStatus.Pending;
        }
        public int UserId { get; set; }
        public User User { get; set; }
        public UserRole MemberType { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}

using Perflow.Domain.Abstract;
using Perflow.Domain.Enums;
using Shared.Auth;

namespace Perflow.Domain
{
    public class PerflowStudioApplicant : BaseEntity
    {
        public PerflowStudioApplicant(int userId, UserRole memberType, int? groupId = null)
        {
            UserId = userId;
            GroupId = groupId;
            MemberType = memberType;
            Status = ApplicationStatus.Pending;
        }
        public int UserId { get; set; }
        public User User { get; set; }

        public int? GroupId { get; set; }
        public Group Group { get; set; }

        public UserRole MemberType { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}

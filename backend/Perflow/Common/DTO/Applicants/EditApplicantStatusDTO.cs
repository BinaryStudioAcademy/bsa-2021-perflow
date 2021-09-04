using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Applicants
{
    public class EditApplicantStatusDTO
    {
        public int Id { get; set; }
        public ApplicationStatus Status { get; set; }
    }
}
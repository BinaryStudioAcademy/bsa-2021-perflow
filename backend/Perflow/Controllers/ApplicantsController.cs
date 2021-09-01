using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Applicants;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class ApplicantsController : ControllerBase
    {
        private readonly ApplicantsService _applicationService;

        public ApplicantsController(ApplicantsService applicationService)
        {
            _applicationService = applicationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWithStatusDTO>>> GetApplicationsAsync()
        {
            return Ok(await _applicationService.GetApplicantsAsync());
        }

        [HttpPut]
        public async Task<ActionResult> EditApplicantStatusAsync(EditApplicantStatusDTO status)
        {
            await _applicationService.EditApplicantStatusAsync(status);

            return Ok();
        }

        [HttpGet("userstSearch")]
        public async Task<ActionResult> GetUsersByNameAsync([FromQuery] string term)
        {
            return Ok(await _applicationService.GetUsersByNameAsync(term));
        }
        
        [HttpPut("editRole")]
        public async Task<ActionResult> EditUserRoleAsync(EditUserRoleDTO userRole)
        {
            await _applicationService.EditUserRoleAsync(userRole);

            return Ok();
        }
    }
}

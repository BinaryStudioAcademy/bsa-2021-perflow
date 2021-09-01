using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Notifications;
using Perflow.Services.Interfaces;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationReadDTO>>> GetAll()
        {
            return Ok(await _notificationService.GetAll(User.GetId()));
        }

        [HttpPost("markAllAsRead")]
        public async Task<ActionResult> MarkAllAsRead()
        {
            await _notificationService.MarkAllAsReadAsync(User.GetId());

            return Ok();
        }

        [HttpPut("changeState")]
        public async Task<ActionResult> ChangeState(NotificationChangeStateDTO notificationChangeState)
        {
            await _notificationService.ChangeStateAsync(notificationChangeState);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _notificationService.DeleteNotificationAsync(id);

            return Ok();
        }
    }
}

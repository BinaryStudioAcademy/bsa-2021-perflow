using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Business.Songs.DTOs;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;

namespace Perflow.Studio.Controllers
{
    [ApiController]
    [Route("api/studio/songs")]
    [Authorize(Policy = Policies.IsArtistOnly)]
    public class SongsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SongsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<SongReadDTO>> AddSong([FromBody] SongWriteDTO songInfo)
        {
            var request = new CreateSongCommand(User.GetId(), songInfo);
            var addedSong = await _mediator.Send(request);

            return Ok(addedSong);
        }

        // TODO Prevent artist from uploading files to songs of other artists
        [HttpPost("{songId:int}/file")]
        public async Task<ActionResult> AddSongFile([FromRoute] int songId, [FromForm] IFormFile songFile)
        {
            var request = new UploadSongFileCommand(songId, songFile);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Accepted(),
                error => BadRequest(error.Value)
            );
        }

        [HttpDelete("{songId:int}")]
        public async Task<ActionResult> DeleteSong([FromRoute] int songId)
        {
            var request = new DeleteSongCommand(songId);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Ok(),
                found => NotFound()
            );
        }

        [HttpPut("{songId:int}/censorship")]
        public async Task<ActionResult> SetCensorship([FromRoute] int songId, [FromQuery] bool value)
        {
            var request = new SetSongCensorshipCommand(songId, value);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Ok(),
                found => NotFound()
            );
        }

        [HttpPut("{songId:int}/name")]
        public async Task<ActionResult> SetName([FromRoute] int songId, [FromQuery] string value)
        {
            var request = new SetSongNameCommand(songId, value);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Ok(),
                found => NotFound()
            );
        }

        [HttpPut("orders")]
        public async Task<ActionResult> UpdateOrders([FromBody] SongOrderDTO[] songOrders)
        {
            var request = new SetSongOrderCommand(songOrders);
            await _mediator.Send(request);

            return Ok();
        }
    }
}

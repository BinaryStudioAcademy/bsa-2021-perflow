using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Perflow.Studio.Business.Songs.Commands;
using Perflow.Studio.Business.Songs.DTOs;
using Perflow.Studio.Business.Songs.Queries;

namespace Perflow.Studio.Controllers
{
    [ApiController]
    [Route("api/studio/songs")]
    public class SongsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SongsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SongReadDTO>>> GetAllSongs()
        {
            var request = new GetAllSongsQuery();
            var songs = await _mediator.Send(request);

            return songs.Any() ? Ok(songs) : NoContent();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<SongReadDTO>> GetSpecificSong([FromRoute] int id)
        {
            var request = new GetSpecificSongQuery(id);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                song => Ok(song),
                notFound => NotFound()
            );
        }

        [HttpPost]
        public async Task<ActionResult<SongReadDTO>> CreateSong([FromBody] SongWriteDTO songDto)
        {
            var request = new CreateSongCommand(songDto);
            var createdSong = await _mediator.Send(request);

            return Ok(createdSong);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateSong([FromRoute] int id, [FromBody] SongWriteDTO songDto)
        {
            var request = new UpdateSongCommand(id, songDto);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => NoContent(),
                notFound => NotFound()
            );
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteSong([FromRoute] int id)
        {
            var request = new DeleteSongCommand(id);
            var result = await _mediator.Send(request);

            return result.Match<ActionResult>(
                success => Ok(),
                notFound => NotFound()
            );
        }
    }
}

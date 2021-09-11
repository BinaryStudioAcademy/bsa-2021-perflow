using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.SongRecignition;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Extensions;
using Shared.Processor.Models;

namespace Perflow.Controllers
{
    [ApiController]
    [Route("api/songRecognition")]
    public class SongRecognitionController : ControllerBase
    {
        private readonly ISongRecognitionService _recognitionService;
        private readonly ISongIndexingService _indexingService;

        public SongRecognitionController(ISongRecognitionService recognitionService, ISongIndexingService indexingService)
        {
            _recognitionService = recognitionService;
            _indexingService = indexingService;
        }

        [HttpPost]
        [RequestSizeLimit(10 * 1024 * 1024)] // Max 10MB
        public async Task<ActionResult> Recognize([FromForm] IFormFile query)
        {
            query ??= Request.Form.Files.FirstOrDefault();

            if (query == null)
            {
                return BadRequest();
            }

            var recognitionOptions = new SongRecognitionOptions
            {
                Data = query.GetBinaryData()
            };

            var result = await _recognitionService.RecognizeAsync(recognitionOptions);

            if (!result.Success)
            {
                return BadRequest();
            }

            return Ok(new SongRecognitionResultDTO
            {
                SongId = result.SongId
            });
        }

        [HttpPost("index")]
        public async Task<ActionResult> IndexSongs()
        {
            await _indexingService.IndexSongs();

            return Ok();
        }
    }
}

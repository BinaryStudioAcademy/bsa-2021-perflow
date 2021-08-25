using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Search;
using Perflow.Services.Implementations;
using Shared.Auth.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.IsUser)]
    public class SearchHistoryController : ControllerBase
    {
        private readonly SearchHistoryService _searchHistoryService;
        public SearchHistoryController(SearchHistoryService searchHistoryService)
        {
            _searchHistoryService = searchHistoryService;
        }

        [HttpPost]
        public async Task<ActionResult> AddSearchHistoryAsync([FromBody] SearchHistoryWriteDTO historyDTO)
        {
            await _searchHistoryService.AddSearchHistory(historyDTO);

            return Ok();
        }
    }
}

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Models;

namespace Perflow.Studio.Services.Interfaces
{
    public interface ISongFilesService
    {
        public Task<OneOf<Success, Error<string>>> UploadSongFileAsync(int songId, IFormFile songFile);

        public Task<OneOf<Success, NotFound>> DeleteSongFilesAsync(int songId);
    }
}

using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Shared.AzureBlobStorage.Models;

namespace Perflow.Services.Interfaces
{
    public interface ISongFilesService
    {
        public Task<BlobDto> GetSongFileAsync(int songId, SongQualityLevel quality);

        public Task UploadSongFile(int songId, IFormFile songFile);

        public Task DeleteSongFilesAsync(Song song);
    }
}

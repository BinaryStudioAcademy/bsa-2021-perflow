using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface IImageService
    {
        Task<string> UploadImageAsync(IFormFile file);

        Task<string> UploadImageAsync(string url);

        Task<bool> DeleteImageAsync(string imageId);

        string GetImageUrl(string imageId);
    }
}

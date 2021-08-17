using Microsoft.AspNetCore.Http;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using System;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ImageService : IImageService
    {
        private IBlobService _blobService;
        private readonly string _containerName = "images";

        public ImageService(IBlobService blobService)
        {
            _blobService = blobService;
        }

        public async Task<string> UploadImageAsync(IFormFile file)
        {
            var guid = Guid.NewGuid().ToString();

            await _blobService.UploadFileBlobAsync(_containerName, new BlobDto
            {
                Content = file.OpenReadStream(),
                ContentType = file.ContentType,
                Guid = guid
            });

            return guid;
        }

        public string GetImageUrl(string imageId)
        {
            if (string.IsNullOrEmpty(imageId))
                return null;

            var uri = _blobService.GetFileUrl(_containerName, imageId);

            return uri.ToString();
        }

        public async Task<bool> DeleteImageAsync(string imageId)
        {
            return await _blobService.DeleteFileBlobAsync(_containerName, imageId);
        }
    }
}

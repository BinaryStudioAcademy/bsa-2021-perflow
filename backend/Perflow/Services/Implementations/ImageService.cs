using Microsoft.AspNetCore.Http;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ImageService : IImageService
    {
        private readonly IBlobService _blobService;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _containerName = "images";

        public ImageService(IBlobService blobService, IHttpClientFactory httpClientFactory)
        {
            _blobService = blobService;
            _httpClientFactory = httpClientFactory;
        }

        public async Task<string> UploadImageAsync(string url)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);

            var contentType = response.Content.Headers.ContentType.MediaType;
            var content = await response.Content.ReadAsStreamAsync();
            var guid = Guid.NewGuid().ToString();

            await _blobService.UploadFileBlobAsync(_containerName, new BlobDto
            {
                Content = content,
                ContentType = contentType,
                Guid = guid
            });

            return guid;
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
            if (string.IsNullOrEmpty(imageId) || !Guid.TryParse(imageId, out _))
                return imageId;

            var uri = _blobService.GetFileUrl(_containerName, imageId);

            return uri.ToString();
        }

        public async Task<bool> DeleteImageAsync(string imageId)
        {
            return await _blobService.DeleteFileBlobAsync(_containerName, imageId);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Shared.AzureBlobStorage.Extensions;

namespace Perflow.Services.Implementations
{
    public class ImageService : IImageService
    {
        private readonly IImageUploadService _imageUploadService;
        private readonly IBlobService _blobService;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly string _containerName = "images";

        public ImageService(IBlobService blobService, IHttpClientFactory httpClientFactory, IImageUploadService imageUploadService)
        {
            _blobService = blobService;
            _httpClientFactory = httpClientFactory;
            _imageUploadService = imageUploadService;
        }

        public async Task<string> UploadImageAsync(string url)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);

            var guid = Guid.NewGuid().ToString();

            var bytes = await response.Content.ReadAsByteArrayAsync();

            _imageUploadService.UploadImage(guid, BinaryData.FromBytes(bytes));

            return guid;
        }

        public Task<string> UploadImageAsync(IFormFile file)
        {
            var guid = Guid.NewGuid().ToString();

            _imageUploadService.UploadImage(guid, file.GetBinaryData());

            return Task.FromResult(guid);
        }

        public string GetImageUrl(string imageId)
        {
            if (string.IsNullOrEmpty(imageId) || !Guid.TryParse(imageId, out _))
            {
                return imageId;
            }

            var uri = _blobService.GetFileUrl(_containerName, imageId);

            return uri.ToString();
        }

        public async Task<bool> DeleteImageAsync(string imageId)
        {
            return await _blobService.DeleteFileBlobAsync(_containerName, imageId);
        }
    }
}

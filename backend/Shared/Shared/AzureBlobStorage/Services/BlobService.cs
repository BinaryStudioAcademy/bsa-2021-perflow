using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using System;
using System.Threading.Tasks;

namespace Shared.AzureBlobStorage.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;

        public BlobService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task<bool> DeleteFileBlobAsync(string blobContainerName, string blobId)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(blobId);

            return await blobClient.DeleteIfExistsAsync();
        }

        public Uri GetFileUrl(string blobContainerName, string blobId)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(blobId);

            return blobClient.Uri;
        }

        public async Task<BlobDto> DownloadFileBlobAsync(string blobContainerName, string blobId)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(blobId);

            if (!await blobClient.ExistsAsync())
            {
                throw new ArgumentException("File not found.");
            }

            using var file = (await blobClient.DownloadAsync())?.Value;

            if (file == null)
            {
                throw new ArgumentException("File not found.");
            }

            return new BlobDto
            {
                Guid = blobId,
                Content = await BinaryData.FromStreamAsync(file.Content),
                ContentType = file.ContentType
            };
        }

        public async Task<Uri> UploadFileBlobAsync(string blobContainerName, BlobDto file)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(file.Guid);

            var data = new BinaryData(file.Content);

            await blobClient.UploadAsync(data, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = file.ContentType }
            });

            return blobClient.Uri;
        }

        private BlobContainerClient GetContainerClient(string blobContainerName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(blobContainerName);
            containerClient.CreateIfNotExists(PublicAccessType.Blob);

            return containerClient;
        }
    }
}

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

        public async Task<BlobDto> DownloadFileBlobAsync(string blobContainerName, string blobId)
        {
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(blobId);

            if (await blobClient.ExistsAsync())
            {
                var file = await blobClient.DownloadAsync();
                return new BlobDto() { Content = file.Value.Content, ContentType = file.Value.ContentType};
            }
            throw new ArgumentException("File not found.");
        }

        public async Task<Uri> UploadFileBlobAsync(string blobContainerName, BlobDto file)
        {
            Console.WriteLine("----------------------------UploadFileBlobAsync started.");
            Console.WriteLine(blobContainerName);
            var containerClient = GetContainerClient(blobContainerName);
            var blobClient = containerClient.GetBlobClient(file.Guid);
            Console.WriteLine(blobClient.Uri);

            await blobClient.UploadAsync(file.Content, new BlobHttpHeaders { ContentType = file.ContentType });

            Console.WriteLine("----------------Finished");
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

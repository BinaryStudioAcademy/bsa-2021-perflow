using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Shared.AzureBlobStorage.Services
{
    public class BlobService : IBlobService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IConfiguration _configuration;

        public BlobService(BlobServiceClient blobServiceClient, IConfiguration configuration)
        {
            _blobServiceClient = blobServiceClient;
            _configuration = configuration;
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
            Console.WriteLine("-------------------UploadFileBlobAsync started-------------------");
            string connString = _configuration["ConnectionStrings:BlobStorage"];

            Console.WriteLine("-------------------GetSection\"ConnectionStrings: BlobStorage\"-------------------");
            Console.WriteLine($"-------------------connString: {connString}-------------------");

            //Possibly can become useful in future

            //CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connString);
            //var client = storageAccount.CreateCloudBlobClient();
            //CloudBlobContainer container = client.GetContainerReference("songs");
            //CloudBlockBlob blockBlob = container.GetBlockBlobReference(file.Guid);
            //using (var fileStream = file.Content)
            //{
            //    _ = blockBlob.UploadFromStreamAsync(fileStream);
            //}


            BlobServiceClient blobServiceClient = new BlobServiceClient(connString);

            Console.WriteLine($"-------------------Get BlobServiceClient-------------------");
            Console.WriteLine($"-------------------BlobServiceClient-AccountName: {blobServiceClient.AccountName}-------------------");
            Console.WriteLine($"-------------------BlobServiceClient-Uri: {blobServiceClient.Uri}-------------------");

            var containerClient = GetContainerClient(blobContainerName);

            Console.WriteLine($"-------------------GetContainerClient-------------------");
            Console.WriteLine($"-------------------ContainerClient-Name: {containerClient.Name}-------------------");
            Console.WriteLine($"-------------------ContainerClient-AccountName: {containerClient.AccountName}-------------------");
            Console.WriteLine($"-------------------ContainerClient-Uri: {containerClient.Uri}-------------------");

            var blobClient = containerClient.GetBlobClient(file.Guid);

            Console.WriteLine($"-------------------GetBlobClient-------------------");
            Console.WriteLine($"-------------------BlobClient-Name: {blobClient.Name}-------------------");
            Console.WriteLine($"-------------------BlobClient-AccountName: {containerClient.AccountName}-------------------");
            Console.WriteLine($"-------------------BlobClient-Uri: {containerClient.Uri}-------------------");

            await blobClient.UploadAsync(file.Content, true);

            Console.WriteLine($"-------------------File Uploaded-------------------");
            Console.WriteLine($"-------------------BlobClient-Uri: {containerClient.Uri}-------------------");

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

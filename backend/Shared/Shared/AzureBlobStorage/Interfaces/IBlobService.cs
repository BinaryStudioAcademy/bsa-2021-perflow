using Shared.AzureBlobStorage.Models;
using System;
using System.Threading.Tasks;

namespace Shared.AzureBlobStorage.Interfaces
{
    public interface IBlobService
    {
        Task<Uri> UploadFileBlobAsync(string blobContainerName, BlobDto file);

        Task<BlobDto> DownloadFileBlobAsync(string blobContainerName, string blobId);

        Task<bool> DeleteFileBlobAsync(string blobContainerName, string blobId);

        Uri GetFileUrl(string blobContainerName, string blobId);
    }
}

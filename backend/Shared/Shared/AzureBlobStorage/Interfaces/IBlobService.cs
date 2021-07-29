using Shared.AzureBlobStorage.Models;
using System;
using System.Threading.Tasks;

namespace Shared.AzureBlobStorage.Interfaces
{
    public interface IBlobService
    {
        Task<Uri> UploadFileBlobAsync(string blobContainerName, BlobDto file);
        Task<BlobDto> DownloadFileBlobAsync(string blobContainerName, string fileName);
        Task<bool> DeleteFileBlobAsync(string blobContainerName, string fileName);
    }
}

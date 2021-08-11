using Shared.AzureBlobStorage.Models;
using System;
using System.Threading.Tasks;

namespace Shared.AzureBlobStorage.Interfaces
{
    public interface IBlobService
    {
        Task<Uri> UploadFileBlobAsync(string blobContainerName, BlobDto file);
        Task<BlobDto> DownloadFileBlobAsync(string blobContainerName, int id);
        Task<bool> DeleteFileBlobAsync(string blobContainerName, int id);
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.AzureBlobStorage.Models;

namespace Shared.AzureBlobStorage.Helpers
{
    public static class FileTransformer
    {
        public static async Task<byte[]> BlobToByteArrayAsync(BlobDto blob)
        {
            byte[] file;
            await using (MemoryStream ms = new())
            {
                await blob.Content.CopyToAsync(ms);
                file = ms.ToArray();
            }

            return file;
        }
    }
}

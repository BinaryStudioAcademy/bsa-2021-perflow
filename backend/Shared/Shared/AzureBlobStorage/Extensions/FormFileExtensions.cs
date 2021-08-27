using System;
using Microsoft.AspNetCore.Http;

namespace Shared.AzureBlobStorage.Extensions
{
    public static class FormFileExtensions
    {
        public static BinaryData GetBinaryData(this IFormFile file)
        {
            using var stream = file.OpenReadStream();
            
            return BinaryData.FromStream(stream);
        }
    }
}

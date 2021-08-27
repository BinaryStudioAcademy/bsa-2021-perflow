using System;

#nullable disable

namespace Shared.AzureBlobStorage.Models
{
    public class BlobDto
    {
        public BinaryData Content { get; set; }
        public string ContentType { get; set; }
        public string Guid { get; set; }
    }
}

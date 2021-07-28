using System.IO;

namespace Shared.AzureBlobStorage.Models
{
    public class BlobDto
    {
        public Stream Content { get; set; }
        public string ContentType { get; set; }
        public string Name { get; set; }
    }
}

using System;

namespace Perflow.Services.Interfaces
{
    public interface IImageUploadService
    {
        public void UploadImage(string guid, BinaryData imageData);
    }
}

namespace Processor.ConsoleApp.Options
{
    public class BlobStorageOptions
    {
        public const string Key = "BlobStorageOptions";

        public string ImagesContainer { get; set; } = string.Empty;

        public string SongsContainer { get; set; } = string.Empty;
    }
}

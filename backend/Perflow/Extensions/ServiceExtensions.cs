using Azure.Storage.Blobs;
using Microsoft.Extensions.DependencyInjection;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Services;

namespace Perflow.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddBlobStorage(this IServiceCollection services, string connectionString)
        {
            services.AddScoped(bsc => new BlobServiceClient(connectionString));
            services.AddScoped<IBlobService, BlobService>();
        }
    }
}
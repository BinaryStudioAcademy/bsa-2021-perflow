using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Extensions;
using Processor.ConsoleApp.Interfaces;
using Processor.ConsoleApp.Options;
using Shared.AzureBlobStorage.Extensions;
using Shared.Processor.Models;
using Shared.RabbitMQ.Extensions;
using Shared.RabbitMQ.Options;

namespace Processor.ConsoleApp.Implementations
{
    public class DefaultContainer : IServiceProvider
    {
        private readonly IServiceProvider _provider;

        public DefaultContainer()
        {
            var services = new ServiceCollection();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("properties.json", optional: false)
                .AddEnvironmentVariables()
                .Build();

            services.AddSingleton<IConfiguration>(configuration);

            services.AddLogging(builder => builder.AddConsole());

            services.AddOptions<BlobStorageOptions>().BindConfiguration(BlobStorageOptions.Key);

            services.AddOptions<ImageProcessingRabbitMQOptions>().BindConfiguration(ImageProcessingRabbitMQOptions.Key);
            services.AddOptions<SongProcessingRabbitMQOptions>().BindConfiguration(SongProcessingRabbitMQOptions.Key);

            RabbitMQOptions rabbitMQOptions = new();
            configuration.Bind("RabbitMQConnection", rabbitMQOptions);
            services.AddRabbitMQ(rabbitMQOptions);

            services.AddBlobStorage(configuration["BlobStorageConnection"]);

            services.AddSingleton<ISongsProcessingService, SongsProcessingService>();

            services.AddSingleton<IProcessor, Processor>();

            services.AddMessageHandlerManager(builder => builder
                .AddHandler<ImageProcessingHandler>());
                // TODO Add .AddHandler<SongProcessingHandler>());

            _provider = services.BuildServiceProvider();
        }

        public object? GetService(Type serviceType)
        {
            return _provider.GetService(serviceType);
        }
    }
}

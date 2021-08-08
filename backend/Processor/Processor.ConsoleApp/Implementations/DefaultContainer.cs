using System;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;
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

            services.AddOptions<ExchangeOptions>().BindConfiguration("ExchangeOptions");
            services.AddOptions<QueueOptions>().BindConfiguration("QueueOptions");

            RabbitMQOptions rabbitMQOptions = new();
            configuration.Bind("RabbitMQConnection", rabbitMQOptions);
            services.AddRabbitMQ(rabbitMQOptions);

            services.AddSingleton<IProcessor, Processor>();

            services.AddSingleton<IAsyncMessageHandler, TestMessageHandler>();

            _provider = services.BuildServiceProvider();
        }

        public object? GetService(Type serviceType)
        {
            return _provider.GetService(serviceType);
        }
    }
}

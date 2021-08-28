using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Shared.Processor.Models;
using Shared.RabbitMQ.Extensions;
using Shared.RabbitMQ.Options;

namespace Perflow.Services.Extensions
{
    public static class AddProcessorRabbitMQExtension
    {
        public static IServiceCollection AddProcessorRabbitMQ(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<ImageProcessingRabbitMQOptions>().BindConfiguration(ImageProcessingRabbitMQOptions.Key);
            services.AddOptions<SongProcessingRabbitMQOptions>().BindConfiguration(SongProcessingRabbitMQOptions.Key);

            var rabbitMqOptions = new RabbitMQOptions();
            configuration.Bind("RabbitMQConnection", rabbitMqOptions);
            services.AddRabbitMQ(rabbitMqOptions);

            return services;
        }
    }
}

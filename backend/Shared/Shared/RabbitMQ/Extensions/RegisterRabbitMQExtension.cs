using System;
using Microsoft.Extensions.DependencyInjection;
using Shared.RabbitMQ.Implementations;
using Shared.RabbitMQ.Interfaces;
using Shared.RabbitMQ.Options;

namespace Shared.RabbitMQ.Extensions
{
    public static class RegisterRabbitMQExtension
    {
        public static void AddRabbitMQ(this IServiceCollection services, RabbitMQOptions options)
        {
            services.AddSingleton<IRabbitMQConnectionFactory, RabbitMQConnectionFactory>(
                provider => new RabbitMQConnectionFactory(options));
            services.AddSingleton<IQueueFactory, QueueFactory>();
        }

        public static void AddRabbitMQ(this IServiceCollection services, Func<IServiceProvider, RabbitMQOptions> resolveOptions)
        {
            services.AddSingleton<IRabbitMQConnectionFactory, RabbitMQConnectionFactory>(
                provider => new RabbitMQConnectionFactory(resolveOptions(provider)));
            services.AddSingleton<IQueueFactory, QueueFactory>();
        }
    }
}

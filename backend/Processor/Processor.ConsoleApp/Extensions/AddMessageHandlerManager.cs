using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Implementations;
using Processor.ConsoleApp.Interfaces;

namespace Processor.ConsoleApp.Extensions
{
    public static class AddMessageHandlerManagerExtension
    {
        public static IServiceCollection AddMessageHandlerManager(this IServiceCollection services, Action<MessageHandlerManagerBuilder> builderAction)
        {
            var builder = new MessageHandlerManagerBuilder();

            builderAction.Invoke(builder);

            foreach (Type handlerType in builder.GetHandlerTypes())
            {
                services.AddSingleton(handlerType);
            }

            services.AddSingleton<IMessageHandlerManager>(provider =>
            {
                var logger = provider.GetRequiredService<ILogger<MessageHandlerManager>>();

                var handlers = builder
                    .GetHandlerTypes()
                    .Select(provider.GetRequiredService)
                    .Cast<IAsyncMessageHandler>();

                return new MessageHandlerManager(logger, handlers);
            });

            return services;
        }
    }

    public class MessageHandlerManagerBuilder
    {
        private readonly HashSet<Type> _handlerTypes = new ();

        public MessageHandlerManagerBuilder AddHandler<THandler>()
            where THandler : class, IAsyncMessageHandler
        {
            _handlerTypes.Add(typeof(THandler));
            return this;
        }

        public HashSet<Type> GetHandlerTypes() => _handlerTypes;
    }
}

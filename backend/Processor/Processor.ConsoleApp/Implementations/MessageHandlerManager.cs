using System;
using System.Collections.Generic;
using System.Threading;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;

namespace Processor.ConsoleApp.Implementations
{
    public class MessageHandlerManager : IMessageHandlerManager
    {
        private readonly ILogger<MessageHandlerManager> _logger;
        private readonly IEnumerable<IAsyncMessageHandler> _handlers;

        public MessageHandlerManager(ILogger<MessageHandlerManager> logger, IEnumerable<IAsyncMessageHandler> handlers)
        {
            _handlers = handlers;
            _logger = logger;
        }

        public void Start(CancellationToken cancellationToken)
        {
            foreach (var handler in _handlers)
            {
                try
                {
                    handler.StartAsync(cancellationToken);
                }
                catch (Exception)
                {
                    _logger.LogError("Couldn't start MessageHandler<{Type}>", handler.GetType().ToString());
                }
            }
        }
    }
}

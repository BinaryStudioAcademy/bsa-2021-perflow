using System;
using System.Threading;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;

namespace Processor.ConsoleApp
{
    public class Processor : IProcessor
    {
        private readonly ILogger<Processor> _logger;
        private readonly IAsyncMessageHandler _messageHandler;

        private readonly CancellationTokenSource _cancellationTokenSource;

        public Processor(ILogger<Processor> logger, IAsyncMessageHandler messageHandler)
        {
            _logger = logger;
            _messageHandler = messageHandler;

            _cancellationTokenSource = new();
        }

        public void Start()
        {
            _logger.LogInformation("Processor started at {Time}", DateTime.Now.ToString());

            _messageHandler.StartAsync(_cancellationTokenSource.Token);

            _logger.LogInformation("Press [Q] to exit");

            while(true)
            {
                var keyInfo = Console.ReadKey(true);
                if (keyInfo.Key == ConsoleKey.Q)
                {
                    _cancellationTokenSource.Cancel();
                    _cancellationTokenSource.Dispose();
                    break;
                }
            }
        }
    }
}

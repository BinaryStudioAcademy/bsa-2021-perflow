using System;
using System.Threading;
using Microsoft.Extensions.Logging;
using Processor.ConsoleApp.Interfaces;

namespace Processor.ConsoleApp
{
    public class Processor : IProcessor
    {
        private readonly ILogger<Processor> _logger;
        private readonly IMessageHandlerManager _handlerManager;

        private readonly CancellationTokenSource _cancellationTokenSource;

        public Processor(ILogger<Processor> logger, IMessageHandlerManager handlerManager)
        {
            _logger = logger;
            _handlerManager = handlerManager;

            _cancellationTokenSource = new();
        }

        public void Start()
        {
            _logger.LogInformation("Processor started at {Time}", DateTime.Now.ToString());

            _handlerManager.Start(_cancellationTokenSource.Token);

            var spin = new SpinWait();

            while (!_cancellationTokenSource.IsCancellationRequested)
            {
                spin.SpinOnce();
            }
        }
    }
}

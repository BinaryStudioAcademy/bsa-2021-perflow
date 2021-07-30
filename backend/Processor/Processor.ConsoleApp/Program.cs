using System;
using Microsoft.Extensions.DependencyInjection;
using Processor.ConsoleApp.Implementations;
using Processor.ConsoleApp.Interfaces;

namespace Processor.ConsoleApp
{
    class Program
    {
        public const string ProgramTitle = "Perflow.Processor";

        public static IServiceProvider Provider { get; } = new DefaultContainer();

        public static void Main()
        {
            Console.Title = ProgramTitle;

            var processor = Provider.GetRequiredService<IProcessor>();
            processor.Start();
        }
    }
}

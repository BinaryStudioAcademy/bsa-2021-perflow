using System;
using Perflow.Studio.Services.Interfaces;

namespace Perflow.Studio.Services.Implementations
{
    public class DateProvider : IDateProvider
    {
        public DateTimeOffset Now => DateTimeOffset.Now;
    }
}

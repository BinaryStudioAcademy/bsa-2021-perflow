using System;

namespace Perflow.Studio.Services.Interfaces
{
    public interface IDateProvider
    {
        public DateTimeOffset Now { get; }
    }
}

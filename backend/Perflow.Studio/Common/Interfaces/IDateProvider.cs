using System;

namespace Perflow.Studio.Common.Interfaces
{
    public interface IDateProvider
    {
        public DateTimeOffset Now { get; }
    }
}

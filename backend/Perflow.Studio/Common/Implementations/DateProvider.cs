using System;
using Perflow.Studio.Common.Interfaces;

namespace Perflow.Studio.Common.Implementations
{
    public class DateProvider : IDateProvider
    {
        public DateTime Now => DateTime.Now;
    }
}

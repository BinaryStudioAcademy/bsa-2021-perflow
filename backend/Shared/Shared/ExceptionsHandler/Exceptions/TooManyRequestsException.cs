using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class TooManyRequestsException : Exception
    {
        public TooManyRequestsException() : base("Too Many Requests Exception.") { }

        public TooManyRequestsException(string errorMessage) : base(errorMessage) { }
    }
}

using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class RequestTimeoutException : Exception
    {
        public RequestTimeoutException() : base("Request Timeout Exception.") { }

        public RequestTimeoutException(string errorMessage) : base(errorMessage) { }
    }
}

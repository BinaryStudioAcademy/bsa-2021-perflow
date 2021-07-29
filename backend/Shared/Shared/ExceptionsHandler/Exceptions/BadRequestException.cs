using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class BadRequestException : Exception
    {
        public BadRequestException() : base("Bad Request.") { }

        public BadRequestException(string errorMessage) : base(errorMessage) { }
    }
}

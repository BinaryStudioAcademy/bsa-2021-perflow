using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class UnauthorizedException : Exception
    {
        public UnauthorizedException() : base("Unauthorized access.") { }

        public UnauthorizedException(string errorMessage) : base(errorMessage) { }
    }
}

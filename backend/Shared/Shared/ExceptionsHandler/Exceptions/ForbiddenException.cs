using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class ForbiddenException : Exception
    {
        public ForbiddenException() : base("Forbidden access.") { }

        public ForbiddenException(string errorMessage) : base(errorMessage) { }
    }
}

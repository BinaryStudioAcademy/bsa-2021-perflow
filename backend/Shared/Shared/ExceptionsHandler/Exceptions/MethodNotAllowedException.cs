using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class MethodNotAllowedException : Exception
    {
        public MethodNotAllowedException() : base("Method not allowed.") { }

        public MethodNotAllowedException(string errorMessage) : base(errorMessage) { }
    }
}

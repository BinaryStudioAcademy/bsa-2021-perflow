using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class NotFoundExcepion : Exception
    {
        public NotFoundExcepion() : base("Resource not found.") { }

        public NotFoundExcepion(string errorMessage) : base(errorMessage) { }
    }
}

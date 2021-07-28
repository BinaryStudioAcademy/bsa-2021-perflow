using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class UnavailableForLegalReasonsException : Exception
    {
        public UnavailableForLegalReasonsException() : base("Unavailable For Legal Reasons.") { }

        public UnavailableForLegalReasonsException(string errorMessage) : base(errorMessage) { }
    }
}

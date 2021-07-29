using System;

namespace Shared.ExceptionsHandler.Exceptions
{
    public sealed class UnsupportedMediaTypeException : Exception
    {
        public UnsupportedMediaTypeException() : base("Unsupported Media Type.") { }

        public UnsupportedMediaTypeException(string errorMessage) : base(errorMessage) { }
    }
}

using System;
using System.Net;
using Shared.ExceptionsHandler.Exceptions;

namespace Shared.ExceptionsHandler.Extensions
{
    public static class ExceptionExtensions
    {
        public static (HttpStatusCode statusCode, string message) ParseException(this Exception exception)
        {
            return exception switch
            {
                ArgumentException _ => (HttpStatusCode.BadRequest, exception.Message),
                BadRequestException _ => (HttpStatusCode.BadRequest, exception.Message),
                UnauthorizedException _ => (HttpStatusCode.Unauthorized, exception.Message),
                ForbiddenException _ => (HttpStatusCode.Forbidden, exception.Message),
                NotFoundExcepion _ => (HttpStatusCode.NotFound, exception.Message),
                MethodNotAllowedException _ => (HttpStatusCode.MethodNotAllowed, exception.Message),
                RequestTimeoutException _ => (HttpStatusCode.RequestTimeout, exception.Message),
                UnsupportedMediaTypeException _ => (HttpStatusCode.UnsupportedMediaType, exception.Message),
                TooManyRequestsException _ => (HttpStatusCode.TooManyRequests, exception.Message),
                UnavailableForLegalReasonsException _ => (HttpStatusCode.UnavailableForLegalReasons, exception.Message),
                _ => (HttpStatusCode.InternalServerError, exception.Message)
            };
        }
    }
}

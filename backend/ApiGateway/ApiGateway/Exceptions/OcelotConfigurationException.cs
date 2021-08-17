using System;

namespace ApiGateway.Exceptions
{
    public class OcelotConfigurationException : Exception
    {
        public OcelotConfigurationException(string message) : base(message) { }
    }
}

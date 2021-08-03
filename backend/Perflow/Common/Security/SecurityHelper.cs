using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;

namespace Perflow.Common.Security
{
    public static class SecurityHelper
    {
        private const int IterationCount = 10000;
        private const int KeyLength = 32;

        public static string HashPassword(string password, byte[] salt) =>
            Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: password,
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: IterationCount,
                    numBytesRequested: KeyLength
                )
            );
    }
}

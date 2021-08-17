using System.Collections.Generic;
using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using OneOf;
using OneOf.Types;
using Perflow.Common.DTO.Users;
using Perflow.Domain;
using Perflow.Services.Interfaces;
using Shared.Auth;
using Shared.Auth.Constants;
using Shared.Auth.Extensions;
using Shared.Auth.Models;

namespace Perflow.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IFirebaseService _firebase;
        private readonly IUsersService _usersService;

        public AuthService(IFirebaseService firebase, IUsersService usersService)
        {
            _firebase = firebase;
            _usersService = usersService;
        }

        public async Task<OneOf<FirebaseToken, AuthServiceError>> VerifyTokenAsync(string token)
        {
            var verificationResult = await _firebase.AuthApp.TryVerifyIdTokenAsync(token);

            return verificationResult.Match<OneOf<FirebaseToken, AuthServiceError>>(
                verifiedToken => verifiedToken,
                authException => new AuthServiceError
                {
                    FirebaseException = authException
                }
            );
        }

        public async Task<OneOf<Success, AuthServiceError>> RegisterUserAsync(RegisterData register)
        {
            var args = new UserRecordArgs
            {
                DisplayName = register.UserName,
                Email = register.Email,
                Password = register.Password
            };

            var result = await _firebase.AuthApp.TryCreateUserAsync(args);

            return result.Match<OneOf<Success, AuthServiceError>>(
                userRecord => new Success(),
                authException => new AuthServiceError
                {
                    FirebaseException = authException
                }
            );
        }

        public async Task<OneOf<Success, AuthServiceError>> LoginAsync(LoginData login)
        {
            var verificationResult = await VerifyTokenAsync(login.AccessToken);

            if (verificationResult.IsT1)
            {
                return verificationResult.AsT1;
            }

            FirebaseToken token = verificationResult.AsT0;

            User user = token.ContainsId() ? await _usersService.GetUserAsync(token.GetId()) : null;

            if (user == null)
            {
                var userData = new UserWriteDTO
                {
                    FirebaseId = token.Uid,
                    UserName = login.UserName,
                    Email = login.Email,
                    Role = UserRole.User
                };

                user = await _usersService.CreateUserAsync(userData);
            }

            var updateResult = await _firebase.AuthApp.TryUpdateUserAsync(new UserRecordArgs
            {
                DisplayName = user.UserName
            });

            if (updateResult.IsT1)
            {
                return new AuthServiceError
                {
                    FirebaseException = updateResult.AsT1
                };
            }

            return await UpdateUserClaimsAsync(user);
        }

        public async Task<OneOf<Success, NotFound, AuthServiceError>> SetRoleAsync(int userId, UserRole role)
        {
            var user = await _usersService.GetUserAsync(userId);

            if (user == null)
            {
                return new NotFound();
            }

            user.Role = role;

            var updateClaimsResult = await UpdateUserClaimsAsync(user);

            if (updateClaimsResult.IsT1)
            {
                return updateClaimsResult.AsT1;
            }

            await _usersService.UpdateUserAsync(user);

            return new Success();
        }

        public async Task<OneOf<Success, AuthServiceError>> UpdateUserAsync(UserRecordArgs args)
        {
            var updateResult = await _firebase.AuthApp.TryUpdateUserAsync(args);

            return updateResult.Match<OneOf<Success, AuthServiceError>>(
                success => success,
                authException => new AuthServiceError
                {
                    FirebaseException = authException
                }
            );
        }

        public async Task<OneOf<Success, NotFound, AuthServiceError>> DeleteUserAsync(int userId)
        {
            var user = await _usersService.GetUserAsync(userId);

            if (user == null)
            {
                return new NotFound();
            }

            await _usersService.DeleteUserAsync(user);

            if (string.IsNullOrEmpty(user.FirebaseId))
            {
                return new Success();
            }

            var deleteResult = await _firebase.AuthApp.TryDeleteUserAsync(user.FirebaseId);

            return deleteResult.Match<OneOf<Success, NotFound, AuthServiceError>>(
                success => success,
                authException => new AuthServiceError
                {
                    FirebaseException = authException
                }
            );
        }

        private async Task<OneOf<Success, AuthServiceError>> UpdateUserClaimsAsync(User user)
        {
            var claims = new Dictionary<string, object>
            {
                { Claims.Id, user.Id },
                { Claims.Role, user.Role }
            };

            var claimsResult = await _firebase.AuthApp.TrySetCustomUserClaimsAsync(user.FirebaseId, claims);

            return claimsResult.Match<OneOf<Success, AuthServiceError>>(
                success => success,
                authException => new AuthServiceError
                {
                    FirebaseException = authException
                }
            );
        }
    }
}

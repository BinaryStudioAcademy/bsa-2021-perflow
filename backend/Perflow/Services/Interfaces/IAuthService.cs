using System.Threading.Tasks;
using FirebaseAdmin.Auth;
using OneOf;
using OneOf.Types;
using Shared.Auth;
using Shared.Auth.Models;

namespace Perflow.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<OneOf<FirebaseToken, AuthServiceError>> VerifyTokenAsync(string token);

        public Task<OneOf<Success, AuthServiceError>> RegisterUserAsync(RegisterData register);

        public Task<OneOf<Success, AuthServiceError>> LoginAsync(LoginData login);

        public Task<OneOf<Success, NotFound, AuthServiceError>> SetRoleAsync(int userId, UserRole role);

        public Task<OneOf<Success, NotFound, AuthServiceError>> DeleteUserAsync(int userId);
    }
}

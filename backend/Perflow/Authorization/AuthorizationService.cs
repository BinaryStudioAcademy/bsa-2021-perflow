using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;

namespace Perflow.Authorization
{
    public class AuthorizationService
    {
        private FirebaseApp _firebaseApp;
        private FirebaseAuth _firebaseAuth;

        public AuthorizationService()
        {
            InitFirebaseAuth();
        }

        private void InitFirebaseAuth()
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.GetApplicationDefault()
            });

            _firebaseApp = FirebaseApp.DefaultInstance;
            _firebaseAuth = FirebaseAuth.GetAuth(_firebaseApp);
        }

        public async Task<UserRecord> VerifyUserByTokenAsync(string token)
        {
            var result = await _firebaseAuth.VerifyIdTokenAsync(token);
            var userId = result.Uid;

            return await _firebaseAuth.GetUserAsync(userId);
        }
        public async Task<UserRecord> VerifyUserByEmailAsync(string email)
        {
            return await _firebaseAuth.GetUserByEmailAsync(email);
        }
    }
}

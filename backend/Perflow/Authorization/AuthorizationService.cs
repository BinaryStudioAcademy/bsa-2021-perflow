using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;

namespace Perflow.Authorization
{
    public class AuthorizationService
    {
        private readonly IConfiguration _config;
        private FirebaseApp _firebaseApp;
        private FirebaseAuth _firebaseAuth;

        public AuthorizationService(IConfiguration config)
        {
            _config = config;
            InitFirebaseAuth();
        }

        private void InitFirebaseAuth()
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(_config.GetSection("FireBaseCreads").Value)
            });
            _firebaseApp = FirebaseApp.GetInstance("Perflow");
            _firebaseAuth = FirebaseAuth.GetAuth(_firebaseApp);
        }
        
        public async Task<UserRecord> VerifyUserByTokenAsync(string token)
        {
            try
            {
                var result = await _firebaseAuth.VerifyIdTokenAsync(token);
                var userId = result.Uid;

                return await _firebaseAuth.GetUserAsync(userId);
            }
            catch (FirebaseAuthException)
            {
                throw;
            }
            catch
            {
                throw;
            }
        }
        public async Task<UserRecord> VerifyUserByEmailAsync(string email)
        {
            try
            {
                return await _firebaseAuth.GetUserByEmailAsync(email);
            }
            catch (FirebaseAuthException)
            {
                throw;
            }
            catch 
            {
                throw;
            }
        }
    }
}

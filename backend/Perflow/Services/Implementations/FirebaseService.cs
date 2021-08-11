using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Perflow.Services.Interfaces;
using Shared.Auth.Models;

namespace Perflow.Services.Implementations
{
    public class FirebaseService : IFirebaseService
    {
        public FirebaseAuth AuthApp { get; }

        public FirebaseService(IConfiguration configuration)
        {
            var firebaseOptions = configuration
                .GetSection(FirebaseOptions.Key)
                .Get<FirebaseOptions>();

            var googleCredentialJson = JsonConvert.SerializeObject(firebaseOptions);

            var app = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromJson(googleCredentialJson)
            });

            AuthApp = FirebaseAuth.GetAuth(app);
        }
    }
}

using FirebaseAdmin.Auth;

namespace Perflow.Services.Interfaces
{
    public interface IFirebaseService
    {
        public FirebaseAuth AuthApp { get; }
    }
}

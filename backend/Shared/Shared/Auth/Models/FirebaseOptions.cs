// ReSharper disable InconsistentNaming
#nullable disable

namespace Shared.Auth.Models
{
    public class FirebaseOptions
    {
        public const string Key = "GOOGLE_CREDENTIALS";

        public string Type { get; set; }

        public string Project_Id { get; set; }

        public string Private_Key_Id { get; set; }

        public string Private_Key { get; set; }

        public string Client_Email { get; set; }

        public string Client_Id { get; set; }

        public string Auth_Uri { get; set; }

        public string Token_Uri { get; set; }

        public string Auth_Provider_X509_Cert_Url { get; set; }

        public string Client_X509_Cert_Url { get; set; }
    }
}

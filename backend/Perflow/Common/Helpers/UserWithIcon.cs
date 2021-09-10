using Perflow.Domain;

namespace Perflow.Common.Helpers
{
    public struct UserWithIcon
    {
        public User User;
        public string IconURL;

        public UserWithIcon(User user, string iconURL)
        {
            User = user;
            IconURL = iconURL;
        }
    }
}
